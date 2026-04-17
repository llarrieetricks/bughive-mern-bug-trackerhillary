const PORT = process.env.PORT || 5000;
const host = process.env.NODE_ENV === "production" ? "" : `http://localhost:${PORT}`;

const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "BugHive API",
    version: "1.0.0",
    description: "API documentation for the BugHive bug tracking backend.",
  },
  servers: [
    {
      url: host || "https://your-backend-url.com",
      description: process.env.NODE_ENV === "production" ? "Production" : "Local",
    },
  ],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Bugs" },
    { name: "Comments" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "661d2b7f1f1f1f1f1f1f1f1f" },
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          role: { type: "string", example: "user" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      Bug: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          status: {
            type: "string",
            enum: ["open", "in-progress", "resolved", "closed"],
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "critical"],
          },
          assignedTo: {
            anyOf: [{ $ref: "#/components/schemas/User" }, { type: "null" }],
          },
          createdBy: { $ref: "#/components/schemas/User" },
          project: { type: "string" },
          tags: {
            type: "array",
            items: { type: "string" },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Comment: {
        type: "object",
        properties: {
          _id: { type: "string" },
          bug: { type: "string" },
          user: { $ref: "#/components/schemas/User" },
          text: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          200: {
            description: "API health status",
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Registered successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Logged in successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          401: {
            description: "Invalid credentials",
          },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current authenticated user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Current user",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/api/bugs": {
      get: {
        tags: ["Bugs"],
        summary: "List all bugs",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "A list of bugs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Bug" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Bugs"],
        summary: "Create a bug",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "description"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high", "critical"],
                  },
                  project: { type: "string" },
                  tags: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created bug",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bug" },
              },
            },
          },
        },
      },
    },
    "/api/bugs/{id}": {
      get: {
        tags: ["Bugs"],
        summary: "Get bug by id",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Bug details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bug" },
              },
            },
          },
          404: { description: "Bug not found" },
        },
      },
      put: {
        tags: ["Bugs"],
        summary: "Update a bug",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  status: {
                    type: "string",
                    enum: ["open", "in-progress", "resolved", "closed"],
                  },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high", "critical"],
                  },
                  assignedTo: {
                    anyOf: [{ type: "string" }, { type: "null" }],
                  },
                  project: { type: "string" },
                  tags: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated bug",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bug" },
              },
            },
          },
          403: { description: "Forbidden" },
          404: { description: "Bug not found" },
        },
      },
      delete: {
        tags: ["Bugs"],
        summary: "Delete a bug",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Delete success",
          },
          403: { description: "Forbidden" },
          404: { description: "Bug not found" },
        },
      },
    },
    "/api/bugs/{id}/assign": {
      put: {
        tags: ["Bugs"],
        summary: "Assign a bug to a user",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userId"],
                properties: {
                  userId: {
                    anyOf: [{ type: "string" }, { type: "null" }],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Assigned bug",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bug" },
              },
            },
          },
          403: { description: "Forbidden" },
          404: { description: "Bug not found" },
        },
      },
    },
    "/api/bugs/{bugId}/comments": {
      get: {
        tags: ["Comments"],
        summary: "List comments for a bug",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "bugId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Comment list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Comment" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Comments"],
        summary: "Create a comment for a bug",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "bugId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["text"],
                properties: {
                  text: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created comment",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Comment" },
              },
            },
          },
          404: { description: "Bug not found" },
        },
      },
    },
    "/api/comments/{id}": {
      delete: {
        tags: ["Comments"],
        summary: "Delete a comment",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Delete success" },
          403: { description: "Forbidden" },
          404: { description: "Comment not found" },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
