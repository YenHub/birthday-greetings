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
