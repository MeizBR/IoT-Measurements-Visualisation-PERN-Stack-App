# Stage-1 & specify a name 'builder'
FROM node:14.14.0-alpine

# Create a directory and go to the directory 
WORKDIR /app

# Copy the package.json file to my current directory to install the necessary dependence  
COPY ./package.json ./

# Install the dependence
RUN npm install

# Copy other files to my current directory
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]