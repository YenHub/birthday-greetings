# Birthday Greetings

<details>

  <summary><strong><code>Original Task Definition</code></strong></summary>

As you’re a very friendly person, you would like to send a birthday note to all the friends you
have. But you have a lot of friends and a bit lazy, it may take some times to write all the
notes by hand.

The good news is that computers can do it automatically for you.

Imagine you have a flat file with all your friends:

```csv
last_name, first_name, date_of_birth, email
Doe, John, 1982/10/08, john.doe@foobar.com
Ann, Mary, 1975/09/11, mary.ann@foobar.com
```

And you want to send them a happy birthday email on their birth date:

```
Subject: Happy birthday!

Happy birthday, dear <first_name>!
```

How would this software look like ? Try to implement it so you can easily change:

- The way you retrieve the friends data (for instance, try switching to a SQLite Db)
- The way you send the note : (for instance, imagine you want to send SMS instead of
  emails)

What kind of tests would you write? Would you use Mocks?

### Additional Features

- Friends born on February, 29th should have their Birthday greeted on February, 28th

</details>

## QuickStart

1. Install the dependencies
   ```bash
   yarn
   ```
2. Initialise your environment
   ```bash
   yarn initial:setup
   ```
3. Launch the solution, specifying the location of your friends data:
   ```bash
   yarn start --file=./example-data/friends.csv
   ```

### Prisma

This project uses [PrismaORM](https://prisma.io) with a SQLite3 driver.

You can view and interact with the data stored in the SQLite3 Database using [Prisma Studio].

[Prisma Studio] is already up and running inside this project, you can launch it by running:

```bash
yarn prisma:studio
```

#### Running DB Migrations

1. Make the necessary changes to [`schema.prisma`](./prisma/schema.prisma)
2. Run the database migrations
   ```bash
   yarn prisma:migrate
   ```

## Questions

### What kind of tests would you write? Would you use Mocks?

I have designed this solution in such a way that it would be fairly straightforward to implement either unit or integration tests.

For unit testing it would make sense to utilise Mocks which would allow us to replace our real dependencies with test dependencies we can spy on and assert the functionality is working as expected.

We could turn to tools like [testdouble](https://testdouble.github.io/testdouble.js/), [Jest mock functions](https://jestjs.io/docs/mock-functions) or [Sinon Mocks](https://sinonjs.org/releases/latest/mocks/) to help us with this process.

I have focussed on meeting the functional requirements of this technical assessment, however; I would be glad to discuss this element in further detail.

<!-- LINKS -->

[Prisma Studio]: https://www.prisma.io/studio
