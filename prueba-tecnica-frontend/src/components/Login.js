import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from '../services/api';

function Login({ onLoginSuccess, setIsSuperuser }) {
    const [nombreUsuario, setnombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(e);
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/token/',
                {
                    username: nombreUsuario,
                    password: contraseña,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { access } = response.data
            const tokenPayload = JSON.parse(atob(access.split('.')[1]));
            const isSuperuser = tokenPayload.is_superuser;

            console.log("Respuesta: ", response.data);
            localStorage.setItem('token', access);
            localStorage.setItem('isSuperuser', isSuperuser ? 'true' : 'false');

            setIsSuperuser(isSuperuser);

            //Enviar al endpoint inicio de sesion

            try {
                const token = localStorage.getItem('token');
                const response = await api.post('/registro_login/',{},{
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                });
                console.log(response.data.message);
            } catch (error) {
                console.error("Error al registrar", error)
            }

            if (isSuperuser) {
                navigate("/dashboard")
                //window.location.reload();
            } else {
                navigate("/home")
                //window.location.reload();
            }

            if (onLoginSuccess) {
                onLoginSuccess();
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error.response) {
                console.error("Detalles del error:", error.response.data)
            }
            alert('Credenciales incorrectas');
            //alert(nombreUsuario + " " + contraseña)
        }
    };

    return (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }} onSubmit={handleSubmit}>
            <h1 style={{ fontFamily: 'sans-serif' }}>LOGIN</h1>
            <div style={{ display: 'flex', flexDirection: 'row', width: '350px', alignItems: 'center', justifyContent: 'space-between', marginTop: '25px' }}>
                <label style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Nombre de usuario:</label>
                <input
                    style={{ border: '1px solid lightgray', borderRadius: '7px', padding: '5px' }}
                    type="text" value={nombreUsuario} onChange={(e) => setnombreUsuario(e.target.value)} placeholder="Username"></input>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', width: '350px', alignItems: 'center', justifyContent: 'space-between', marginTop: '25px', marginBottom: '25px' }}>
                <label style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Contraseña:</label>
                <input
                    style={{ border: '1px solid lightgray', borderRadius: '7px', padding: '5px' }}
                    type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Password">
                </input>
            </div>

            <button style={{ marginTop: '5px', border: "1px solid lightgray", backgroundColor: 'lightgray', borderRadius: '5px', height: '30px', width: '120px', cursor: 'pointer', fontWeight: 'bold' }} type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;