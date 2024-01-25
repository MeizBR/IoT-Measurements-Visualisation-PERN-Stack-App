pipeline {
    agent any

    stages {
        stage('Build and Deploy') {
            steps {
                script {
                    // Build React app
                    dir('frontend') {
                        docker.build('my-react-app:latest')
                    }

                    // Build Express.js app
                    dir('backend') {
                        docker.build('my-express-app:latest')
                    }

                    // Build nginx
                    dir('nginx') {
                        docker.build('my-nginx:latest')
                    }

                    // Deploy using docker-compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'PERN stack deployment successful!'
        }
        failure {
            echo 'PERN stack deployment failed.'
        }
    }
}