import Ajv, { JSONSchemaType } from "ajv"
import { IPetsResponse } from "../../interfaces/ipets"
export const responsePetSchema: JSONSchemaType<IPetsResponse> = JSON.parse(JSON.stringify({
  "type": "object",
  "properties": {
    "id": {
      "type": "integer"
    },
    "category": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "name": {
      "type": "string"
    },
    "photoUrls": {
      "type": "array",
      "items": [
        {
          "type": "string"
        }
      ],
      maxItems: 5,
      minItems: 1
    },
    "tags": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer"
            },
            "name": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "name"
          ]
        }
      ],
      maxItems: 10,
      minItems: 1
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "category",
    "name",
    "photoUrls",
    "tags",
    "status"
  ]
}))
const ajv = new Ajv({strictTuples:false});
export const validatePetSchema = ajv.compile(responsePetSchema)