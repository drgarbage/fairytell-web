# Domain Model & Schema


## ServiceAccount
The ServiceAccount represents a Service Account with various attributes related to their profile, media content, services, and schedules. Below is a detailed description of each column within the object.

| Column        | Type        | Description                                                                                       |
|---------------|-------------|---------------------------------------------------------------------------------------------------|
| `id`          | String      | A unique identifier for the user, represented by a 7-character UID.                               |
| `avatar`      | String      | The URL of the user's profile photo.                                                              |
| `state`       | Enum        | The user's online state, with possible values being `ONLINE` or `OFFLINE`.                        |
| `activated`   | Boolean     | A flag indicating whether the user's account is activated.                                        |
| `createdAt`   | Date String | The creation date and time of the user's account in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).       |
| `profile`     | Object      | An object containing details about the user's profile, including name, birthday, nation, and physical attributes such as height, weight, and cup size with possible values ranging from `A` to `F`. |
| `medias`      | Array       | An array of objects, each representing a media item associated with the user, specifying the media type (e.g., `image/png`, `video/mp4`) and its URL. |
| `tags`        | Array       | An array of strings, each representing a tag associated with the user.                            |
| `packages`    | Array       | An array of objects, each representing a service package offered by the user, including the package name, price, and commissions for brokers and merchants. |
| `freeServices`| Array       | An array of objects, each representing a service offered by the user for free, specifying the service name and its price (which is `0`). |
| `paidServices`| Array       | An array of objects, each representing a service offered by the user for a fee, specifying the service name and its price. |
| `schedules`   | Array       | An array of objects, each representing the user's availability schedule, specifying the schedule type (`WEEKLY` or `DATE`) and the beginning and end times. |

Note: The `profile` object's `nation` field uses country codes, with `tw` representing Taiwan. The `height` and `weight` fields are specified in centimeters and kilograms, respectively.

# Profile

The `profile` object contains detailed information about the user's personal profile. Below is a table that describes each column within the `profile` object.

| Column    | Type        | Description                                       |
|-----------|-------------|---------------------------------------------------|
| `name`    | String      | The name of the user.                             |
| `age`     | number      | The user's age.                                   |
| `birthday`| Date String | DEPRECATED                                        |
| `nation`  | String      | The user's nationality, represented by a country code (e.g., `tw` for Taiwan). |
| `height`  | Integer     | The user's height in centimeters.                 |
| `weight`  | Integer     | The user's weight in kilograms.                   |
| `cup`     | Enum        | The user's cup size, with possible values ranging from `A` to `F`. |

This structure provides a comprehensive overview of the user's personal and physical characteristics.


# Order

This table provides a detailed description of each property within the given object structure.

| Property            | Type            | Description                                                                |
|---------------------|-----------------|----------------------------------------------------------------------------|
| `id`                | String          | A unique identifier for the transaction, represented by a 7-character UID. |
| `status`            | Enum            | The status of the transaction, possible values are `REQUESTING`, `ACCEPTED`, `COMPLETED`, `CANCELED`. |
| `serviceAccount`    | String          | The ID of the service account involved in the transaction.                 |
| `provider`          | String          | The User ID of the provider.                                               |
| `customer`          | String          | The User ID of the customer.                                               |
| `dealer`            | String          | The User ID of the dealer.                                                 |
| `agent`             | String          | The User ID of the agent.                                                  |
| `merchant`          | String          | The merchant account ID.                                                   |
| `createdAt`         | Date String     | The creation date of the transaction in ISO 8601 format.                   |
| `completedAt`       | Date String     | The completion date of the transaction in ISO 8601 format.                 |
| `serviceAccountInfo`| Object          | Reference information of the service account.                              |
| `providerInfo`      | Object          | Reference information of the provider.                                     |
| `customerInfo`      | Object          | Reference information of the customer.                                     |
| `dealerInfo`        | Object          | Reference information of the dealer.                                       |
| `agentInfo`         | Object          | Reference information of the agent.                                        |
| `merchantInfo`      | Object          | Reference information of the merchant.                                     |
| `locationInfo`      | Object          | Reference information of the location.                                     |
| `paymentInfo`       | Object          | Contains payment information related to the transaction.                   |
| `commissions`       | Object          | Contains commission details related to the transaction.                    |
| `total`             | Number          | The total amount of the transaction.                                       |
| `items`             | Array           | An array of objects, each representing an item involved in the transaction, including its name, price, and commissions for brokers and merchants. |

This table outlines the structure and functionality of each property in the given object, providing a clear understanding of its purpose and use.
