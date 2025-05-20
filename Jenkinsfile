pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ChrispinSantacruz/Ecocommers-Narino.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Construyendo la aplicación...'
                // Aquí puedes agregar comandos para construir tu proyecto, por ejemplo:
                // sh 'npm install'
                // sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Ejecutando pruebas...'
                // Agrega aquí tus comandos para ejecutar pruebas, por ejemplo:
                // sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Despliegue simulado.'
                // Aquí puedes agregar comandos para desplegar la app
            }
        }
    }
}
