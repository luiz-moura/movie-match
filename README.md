# Welcome to movie-match

![movie-match](https://github.com/luiz-moura/movie-match-laravel/assets/57726726/34a13832-6624-447e-b4ba-c5c651baab70)

> Find the Perfect Movie with a Swipe!
 - Receive match event via websocket
 - Continues from the film that left off in the room
 - Does not allow opening the same room in other browser tabs
 - Routine for deleting unused rooms

## Technologies

- [Laravel](https://laravel.com)
- [Reverb](https://reverb.laravel.com/)
- [Inertial](https://inertiajs.com/)
- [ReactJs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Install

1. Clone the project
```bash
  git clone https://github.com/luiz-moura/movie-match.git
```

2. Install and start
```bash
  make
```

3. Start the queue
```bash
  make queue
```

4. Start the reverb (websocket)
```bash
  make reverb
```

5. Run npm-dev
```bash
  make npm dev
```

Project listen in port http://localhost:80

Set your `TMDB_TOKEN` in your `.env` file. You can get an API key [here](https://www.themoviedb.org/documentation/api). Make sure to use the "API Read Access Token (v4 auth)" from the TMDb dashboard.

## Author

* Github: [@luiz-moura](https://github.com/luiz-moura)
* LinkedIn: [@luiz-moura](https://linkedin.com/in/luiz-moura)

## Show your support

Give a ⭐️ if this project helped you!
