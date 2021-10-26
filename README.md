# Translate

```sh
npm install translatia -g
```

## How to use

1. After you install this project, get the manuscripts from the [reduction](https://github.com/ivandustin/reduction)
project.

    ```sh
    git clone https://github.com/ivandustin/reduction.git
    ```

1. Select a book to translate in the `reduction/books` folder. The book names are numerical and starts from the book
of Matthew with the filename `40.json`.
1. Run the translation app. We will translate the book of Matthew (`40.json`) in this example.

    ```sh
    translate reduction/books/40.json
    ```

1. Go to http://localhost:2122 in your browser and use the app.
1. Use [CNTR](https://greekcntr.org/collation/index.htm) as your translation guide.

> The app automatically saves your changes. It is written directly in the input `.json` file.

You can publish your work by creating a separate repository in Github.
See this [repository](https://github.com/ivandustin/translation-ph) as an example.
