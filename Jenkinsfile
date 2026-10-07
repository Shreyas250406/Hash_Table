pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'chmod +x node_modules/.bin/vite'
                sh 'npm run build'
            }
        }
    }
}
