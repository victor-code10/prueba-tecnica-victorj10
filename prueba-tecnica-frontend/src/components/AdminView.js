import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as Chartjs,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chartjs.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function AdminView({onLogout}) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    //Funcion para cerrar sesion
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
    //Funcion para traer los datos de la actividad del usuario desde el
    //back-end y mostrarlos en una tabla.

    const [actividadUsuario, setActividadUsuario] = useState([]);
    const [dataCircular, setDataCircular] = useState(null);

    useEffect(() => {
        const fetchActividadUsuario = async () => {
            try {
                const response = await api.get('/user-activity/');
                const data = response.data.map(activity => ({
                    ...activity,
                    duracionSesion: calcularDuracionSesion(activity.login_time, activity.logout_time)
                }))
                setActividadUsuario(data);
                console.log(response.data);

                //Gráfico circular
                let totalClicsBoton1 = 0;
                let totalClicsBoton2 = 0;

                data.forEach(activity => {
                    totalClicsBoton1 += activity.button_click_count;
                    totalClicsBoton2 += activity.button_click_count_2;
                });

                setDataCircular({
                    labels: ['Total de Clics del Botón 1', 'Total de Clics del Botón 2'],
                    datasets: [
                        {
                            data: [totalClicsBoton1, totalClicsBoton2],
                            backgroundColor: ['#FF6384', '#36A2EB'],
                        },
                    ],
                });


            } catch (error) {
                console.error("Error al obtener la actividad de los usuarios:", error);
            }
        };
        fetchActividadUsuario();

    }, []);

    const calcularDuracionSesion = (loginTime, logoutTime) => {
        if (!loginTime || !logoutTime) return "Sesión en curso";
        const loginDate = new Date(loginTime);
        const logoutDate = new Date(logoutTime);
        const duracionSegundos = Math.floor((logoutDate - loginDate) / 1000);
        const minutos = Math.floor(duracionSegundos / 60);
        return `${minutos} min`;
    };

    function GraficoBarras({ actividadUsuario }) {
        const labels = actividadUsuario.map(activity => activity.user.username);
        const dataBoton1 = actividadUsuario.map(activity => activity.button_click_count);
        const dataBoton2 = actividadUsuario.map(activity => activity.button_click_count_2);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Clics en Botón 1',
                    data: dataBoton1,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Clics en Botón 2',
                    data: dataBoton2,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)'
                }
            ]
        };

        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        return <Bar data={data} options={options} />;
    }

    //Gráfico circular





    //Código para la vista 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: 'sans-serif' }}>Gestión de usuarios</h1>
            <button
                style={{ marginTop: '5px', border: "1px solid lightgray", backgroundColor: 'lightgray', borderRadius: '5px', height: '30px', width: '120px', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={handleLogout}>Cerrar sesión</button>
            <table style={{ fontFamily: 'sans-serif', borderCollapse: 'collapse', width: '750px', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Nombre del usuario</th>
                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Inicio de sesión</th>
                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Tiempo</th>
                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Botón 1</th>
                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Botón 2</th>
                    </tr>
                </thead>

                <tbody>
                    {actividadUsuario.map((activity => (
                        <tr key={activity.id}>

                            <td style={{ border: '1px solid black', textAlign: 'left' }}>{activity.user.username}</td>
                            <td style={{ border: '1px solid black', textAlign: 'left' }}>{new Date(activity.login_time).toLocaleDateString()}</td>
                            <td style={{ border: '1px solid black', textAlign: 'left' }}>{activity.duracionSesion}</td>
                            <td style={{ border: '1px solid black', textAlign: 'left' }}>{activity.button_click_count}</td>
                            <td style={{ border: '1px solid black', textAlign: 'left' }}>{activity.button_click_count_2}</td>
                        </tr>
                    )))}
                </tbody>
            </table>

            <br></br>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '700px', marginTop: '70px' }}>
                <div style={{ width: '300px', height: '300px' }}>
                    {GraficoBarras && (
                        <GraficoBarras actividadUsuario={actividadUsuario} />
                    )}
                </div>

                <div style={{ width: '300px', height: '300px' }}>
                    {dataCircular && (
                        <Doughnut data={dataCircular} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminView;