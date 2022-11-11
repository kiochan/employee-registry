# Employee Registry

Employee Registry is simple system for managing data of employee.

## Goals of this project

This project is a Programming assignment for Software Engineer.

To read the original requirements, [click here](./TASK.md).

## Getting Started

1. Create a `.env` file like below: (see `.env_template`)

   ```plaintext
   MONGODB_USERNAME="<USERNAME>"
   MONGODB_PASSWORD="<SECRET>"
   MONGODB_HOST="<HOST>"
   MONGODB_DBNAME="<DATABASE_NAME>"
   ```

2. Install all dependencies using pnpm.

   ```shell
   pnpm i
   ```

   _This project is recommended to use `pnpm` as package manager, other package managers may also work but will they will not be tested._

   _For more about pnpm click [here](https://pnpm.io/)._

3. Build it

   ```shell
   pnpm build
   ```

4. Start it

   ```shell
   pnpm start
   ```

## Code style and formatting

This project use [JavaScript Standard Style](https://standardjs.com/).

This project will use comments and typing to avoid excessive documentation.

The priority is as follows:

```plaintext
meaningful variable/type name < comments < documentation
```

We should use meaningful variable/type name:

```typescript
// bad
/**
 * fetch a image from server by filename
 * @param name filename
 * @returns Image instance
 */
function fetch(name) {
  // implementation
}

// good
function fetchImageByFilename(filename: string): Image {
  // implementation
}
```

We should avoid comments like the following: (because it's very obvious)

```typescript
// bad
interface Point {
  /**
   * x-axis coordinate
   */
  x: number
  /**
   * y-axis coordinate
   */
  y: number
}

// good
interface Point {
  x: number
  y: number
}
```

## Change logs

To view the project log, go to [click here](./CHANGELOG.md).
