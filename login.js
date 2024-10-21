// login.js

import AWS from 'aws-sdk';
import bcrypt from 'bcrypt';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

export const handler = async (event) => {
    const { email, password } = JSON.parse(event.body);

    const params = {
        TableName: USERS_TABLE,
        Key: { email },
    };

    try {
        const result = await dynamoDb.get(params).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'User not found' }),
            };
        }

        const isPasswordValid = await bcrypt.compare(password, result.Item.password);

        if (!isPasswordValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid password' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not log in' }),
        };
    }
};
