import React, { useState} from "react";
import api from '../services/api';
import { useNavigate } from "react-router-dom";

function UserView({onLogout}) {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));


    //Metodo para cerrar la sesión
    const handleLogout = async () => {

        try {
            const token = localStorage.getItem('token');
            await api.post('/registro_logout/', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onLogout();
            console.log("Token eliminado, cerrando sesión...");
            navigate("/login");
        } catch (error) {
            console.error("Error al registrar el cierre de sesion", error)
        }
    };

    const handleButtonClick = async (buttonType) => {
        try {
            await api.post('/user-activity/', { button: buttonType });
            alert(`¡Botón ${buttonType} presionado!`);
        } catch (error) {
            console.error('Error al registrar el clic:', error);
        }
    };

    const handleButtonClick2 = async (buttonType) => {
        try {
            await api.post('/user-activitybutton2/', { button: buttonType });
            alert(`¡Botón ${buttonType} presionado!`);
        } catch (error) {
            console.error('Error al registrar el clic:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft:'20px', marginTop:'20px' }}>
            <button
                style={{ marginTop: '5px', border: "1px solid lightgray", backgroundColor: 'lightgray', borderRadius: '5px', height: '30px', width: '120px', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={handleLogout}>Cerrar sesión
            </button>
            <h2 style={{ fontFamily: 'sans-serif' }}>Bienvenido/a</h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{marginRight:'20px'}}>
                    <img width="150px" height="150px" src="https://cdn-icons-png.flaticon.com/512/8297/8297510.png" />
                </div>

                <div>
                    <h2 style={{ fontFamily: 'sans-serif' }}>Título: API DJANGO - REACT</h2>
                    <p style={{ textAlign: 'justify', width: '500px', fontFamily: 'sans-serif' }}>Descripción: Esta App tiene como objetivo registrar las actividades de los usuarios dentro de la web
                        para luego gestionar la información y generar tendencias.

                        Se enfoca específicamente en el inicio y cierre de sesión, también en la pulsación de los botones
                        y la duración de las sesiones.</p>

                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginLeft:'-20px' }}>
                <button style={{ border: "1px solid lightgray", backgroundColor: 'lightgray', borderRadius: '5px', height: '30px', width: '85px', cursor: 'pointer', fontWeight: 'bold', marginRight:'50px' }} onClick={() => handleButtonClick('botón 1')}> Botón 1</button>
                <button style={{ border: "1px solid lightgray", backgroundColor: 'lightgray', borderRadius: '5px', height: '30px', width: '85px', cursor: 'pointer', fontWeight: 'bold', marginLeft:'50px'}} onClick={() => handleButtonClick2('botón 2')}> Botón 2</button>
            </div>
        </div>
    );
}

export default UserView;