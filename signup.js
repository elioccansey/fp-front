// signup.js

import AWS from 'aws-sdk';
import bcrypt from 'bcrypt';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

export const handler = async (event) => {
    const { email, password, name, profileImage } = JSON.parse(event.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        email,
        password: hashedPassword,
        name,
        profileImage,
    };

    const params = {
        TableName: USERS_TABLE,
        Item: user,
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User created successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create user' }),
        };
    }
};
