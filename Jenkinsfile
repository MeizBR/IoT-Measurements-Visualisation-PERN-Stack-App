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
                    sh 'npm test'
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
                    sh 'npm test'
                }
            }
        }
        
        // This stage is telling Jenkins to build the images for the client and server.
        stage('Build Images') {
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
                }
            }
        }
        
        // This stage is telling Jenkins to push the images to DockerHub.
        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push meiezbr/iot-measurements-visualisation:client-latest'
                    sh 'docker push meiezbr/iot-measurements-visualisation:server-latest'
                }
            }
        }
    }
}
