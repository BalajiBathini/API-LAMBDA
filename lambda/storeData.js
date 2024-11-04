import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Configure the S3 client
const s3 = new S3Client({ region: "ap-south-1" });

export const handler = async (event) => {
  try {
    // Parse incoming JSON data
    const jsonData = JSON.parse(event.body);

    // Generate a unique file name
    const fileName = `${uuidv4()}.json`;

    // Define S3 bucket and parameters
    const bucketName = "myfirst-bucket-007"; // Replace with your S3 bucket name
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: JSON.stringify(jsonData),
      ContentType: "application/json"
    };

    // Upload the JSON data to S3
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

    // Construct the S3 URL and ETag
    const s3Url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        e_tag: data.ETag,
        url: s3Url
      })
    };

    return response;
  } catch (error) {
    console.error("Error storing JSON data:", error);

    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to store JSON data",
        error: error.message
      })
    };
  }
};
