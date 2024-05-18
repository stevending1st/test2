---
title: JS Remove Char from String – How to Trim a Character from a String in
  JavaScript
author: Dionysia Lemonaki
authorURL: https://www.freecodecamp.org/news/author/dionysialemonaki/
originalURL: https://www.freecodecamp.org/news/javascript-remove-char-from-string/
translator: ""
reviewer: ""
---

May 9, 2024 / [#JavaScript][1]

<!-- more -->

# JS Remove Char from String – How to Trim a Character from a String in JavaScript

![Dionysia Lemonaki](https://cdn.hashnode.com/res/hashnode/image/upload/v1713284398578/Zpo5ssvLj.jpeg)

[Dionysia Lemonaki][2]

  ![JS Remove Char from String – How to Trim a Character from a String in JavaScript](https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/cckf4TsHAuw/upload/1d75957a397f479d41bc73b407025508.jpeg)

Manipulating strings is a fundamental skill in programming.

A common task you might encounter when coding in JavaScript is trimming characters from a string. Trimming involves removing specific characters from the beginning and/or end of a string. These characters can be leading or trailing whitespace, tabs, line breaks, or trailing commas.

You may also want to remove specific characters you don't want in your program and replace them with others.

In this article, you will learn about some methods you can use to trim and remove characters from a string in JavaScript.

## How to Remove Whitespace Characters Using the `trim()` Method in JavaScript

You can remove leading and trailing whitespace characters from a string using the built-in `trim()` method.

Here is the general syntax for the `trim()` method:

```
string.trim()
```

The `trim()` method is called directly on the string you want to trim. The method removes any whitespace characters such as spaces, tabs, or line breaks, from the beginning and end of the string.

Note that the `trim()` method doesn't modify the original string. Instead, it returns a new trimmed string, with the leading and trailing characters removed.

Let's take the following example:

```
let greeting = "    Hello World    ";

let trimmedGreeting = greeting.trim();

console.log(trimmedGreeting); // Output: "Hello World"
```

In the example above, I declared a variable named `greeting` and assigned the string value `Hello World` . The string has spaces both at the beginning and the end.

To remove those leading and trailing spaces, I called the `trim()` method on the `greeting` variable and stored the result in a new variable, `trimmedGreeting`.

When I used `console.log()` to print the new string to the console, the leading and trailing spaces had been removed.

The original string in `greeting` still contains the leading and trailing spaces.

### How to Remove Leading Whitespace Characters Using the `trimStart()` Method in JavaScript

To remove whitespace characters only form the start of a string in JavaScript, you can use the `trimStart()` method.

Let's take the following example:

```
let greeting = "    Hello World    ";

let trimmedGreeting = greeting.trimStart();

console.log(trimmedGreeting); // Output: "Hello World    "
```

In the example above, the `greeting` variable has a string value of `Hello World` .The string has spaces at the beginning and the end.

I called the `trimStart()` method on `greeting` and saved the result in `trimmedGreeting`. This method removes only any whitespaces from the beginning of the string. The whitespaces at the end of the string will remain.

### How to Remove Trailing Whitespace Characters Using the `trimEnd()` Method in JavaScript

To remove whitespace characters only form the end of a string in JavaScript, you can use the `trimEnd()` method.

Let's take the following example:

```
let greeting = "    Hello World    ";

let trimmedGreeting = greeting.trimEnd();

console.log(trimmedGreeting); // Output: "    Hello World"
```

The string stored in `greeting` has spaces at the beginning and the end.

I called the `trimEnd()` method on `greeting` and saved the result in `trimmedGreeting`. This method removes only any whitespaces from the end of the string. The whitespaces at the beginning of the string will remain.

## How to Remove a Character Using the `replace()` Method in JavaScript

To remove a specific character from a string in JavaScript, you can use the `replace()` method.

Here is the general syntax for the `replace()` method:

```
string.replace(pattern, replacement);
```

You call the `replace()` method on a string you want to modify. The method accepts two arguments: `pattern` and `replacement`.

The `pattern` argument specifies the pattern you want to find and replace in the string. This can be a specific character, substring, or regular expression pattern you want to find and replace in the string.

The `replacement` argument is the new character or string you want to replace `pattern` with.

Note that the `replace()` method doesn't modify the original string.

Let's take a look at an example:

```
let sentence = "I love dogs";

let modifiedSentence  = sentence.replace("dogs", "cats");

console.log(modifiedSentence); // Output: "I love cats"
```

I first declared a variable named `sentence` and assigned the string value `I love dogs`.

Then, I called the `replace()` method on `sentence`, as I want to remove the substring `dogs` and replace it with `cats`. I then stored the result in the new variable `modifiedSentence`.

Lastly, I logged the string stored in the `modifiedSentence` variable to the console. The `"I love cats"` string is printed to the console.

The `replace()` method found the substring `dogs` and replaced it with `cats`, without changing anything else.

## How to Remove Multiple Instances of a Character Using the `replace()` Method in JavaScript

In the previous section, you saw an example of how to use the `replace()` method to replace one word with another one.

What happens though when you've got multiple occurrences of the word you want to replace?

```
let sentence = "I love dogs because dogs are cute";

let modifiedSentence  = sentence.replace("dogs", "cats");

console.log(modifiedSentence); // Output: "I love cats because dogs are cute"
```

In the example above, the `sentence` variable has two occurrences of the word `dogs` that I want to replace with the word `cats`. However, the `replace()` method by default only replaces the first occurrence of `dogs`.

Removing multiple occurrences of a word using the `replace()` method is a bit different. You achieve this by using a regular expression.

Let's rewrite the code using a regular expression:

```
let sentence = "I love dogs because dogs are cute";

let modifiedSentence  = sentence.replace(/dogs/g, "cats");

console.log(modifiedSentence); // Output: "I love cats because cats are cute"
```

In the example above, I replaced all occurrences of the string `dogs` with the string `cats`.

Instead of passing a string as the first argument to `replace()`, I passed the regular expression `/dogs/g`, which using the `g` flag. This flag stands for `global`, and matches all occurrences of the word `dogs`, not just the first one.

## Conclusion

In this article, you learned the very basics of trimming strings and replacing characters in strings in JavaScript.

Specifically, you learned how to use the `trim()` method to trim both leading and trailing whitespace characters, and learned about the `trimStart()` and `trimEnd()` methods to remove only leading or only trailing whitespace characters, respectively.

Lastly, you learned how to use the `replace()` method to remove specific characters and replace them with others.

Thanks for reading, and happy coding!

---

![Dionysia Lemonaki](https://cdn.hashnode.com/res/hashnode/image/upload/v1713284398578/Zpo5ssvLj.jpeg)

[Dionysia Lemonaki][3]

Read [more posts][4].

---

If this article was helpful, share it.

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started][5]

[1]: /news/tag/javascript/
[2]: /news/author/dionysialemonaki/
[3]: /news/author/dionysialemonaki/
[4]: /news/author/dionysialemonaki/
[5]: https://www.freecodecamp.org/learn/