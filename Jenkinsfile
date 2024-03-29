// This is a Jenkinsfile. It is a script that Jenkins will run when a build is triggered.
pipeline {
    // Telling Jenkins to run the pipeline on any available agent.
    agent any

    // Setting environment variables for the build.
    environment {
        PGHOST = credentials('postgres-host')
        PGDATABASE = credentials('postgres-database')
        PGUSER = credentials('postgres-user')
        PGPASSWORD = credentials('postgres-password')
        PGPORT = 5432
        DOCKER_HUB_PWD = credentials('dockerhub')
    }

    // This is the pipeline. It is a series of stages that Jenkins will run.
    stages {
        // This state is telling Jenkins to checkout the source code from the source control management system.
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        // This stage is telling Jenkins to run the tests in the client directory.
        stage('Client Tests') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    // sh 'npm test'
                }
            }
        }
        
        // This stage is telling Jenkins to run the tests in the server directory.
        stage('Server Tests') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'export PGHOST=$PGHOST'
                    sh 'export PGDATABASE=$PGDATABASE'
                    sh 'export PGUSER=$PGUSER'
                    sh 'export PGPASSWORD=$PGPASSWORD'
                    sh 'export PGPORT=$PGPORT'
                    // sh 'npm test'
                }
            }
        }
        
        // This stage is telling Jenkins to build the images for the client and server.
        stage('Build Images') {
            steps {
                script {
                    // Build React app
                    dir('frontend') {
                        sh "docker build -t meiezbr/my-react-app:latest ."
                    }

                    // Build Express.js app
                    dir('backend') {
                        sh "docker build -t meiezbr/my-express-app:latest ."
                    }

                    // Build nginx
                    dir('nginx') {
                        sh "docker build -t meiezbr/my-nginx:latest ."
                    }
                }
            }
        }
        
        // This stage is telling Jenkins to push the images to DockerHub.
        stage('Push Images to DockerHub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKER_HUB_PWD')]) {
                    sh 'docker login -u mayezbr9@gmail.com -p $DOCKER_HUB_PWD'
                    sh 'docker push meiezbr/my-react-app:latest'
                    sh 'docker push meiezbr/my-express-app:latest'
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