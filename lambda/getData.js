import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

// Configure the S3 client
const s3 = new S3Client({ region: "ap-south-1" });

export const handler = async (event) => {
  try {
    const bucketName = "myfirst-bucket-007"; // Replace with your S3 bucket name

    // List all objects in the S3 bucket
    const listParams = {
      Bucket: bucketName,
    };
    const listCommand = new ListObjectsV2Command(listParams);
    const listedObjects = await s3.send(listCommand);

    // Check if the bucket has any objects
    if (!listedObjects.Contents) {
      return {
        statusCode: 200,
        body: JSON.stringify([]), // Return an empty array if no files are found
      };
    }

    // Retrieve and compile the contents of each JSON file
    const allData = [];
    for (const item of listedObjects.Contents) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: item.Key,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      const data = await s3.send(getCommand);

      // Parse the JSON data
      const bodyContent = await streamToString(data.Body);
      allData.push(JSON.parse(bodyContent));
    }

    // Return compiled data as JSON
    return {
      statusCode: 200,
      body: JSON.stringify(allData),
    };
  } catch (error) {
    console.error("Error retrieving JSON data:", error);

    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to retrieve JSON data",
        error: error.message,
      }),
    };
  }
};

// Helper function to convert stream to string
const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });
