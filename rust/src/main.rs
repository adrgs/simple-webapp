#[macro_use]
extern crate rocket;

use rocket::{get, post};

#[get("/?<name>")]
fn index(name: Option<&str>) -> String {
    let name = name.unwrap_or("World");
    format!("Hello {}!", name)
}

#[post("/", data = "<user_input>")]
fn parse_post(user_input: String) -> String {
    if user_input == "super_secret_string" {
        let flag = std::fs::read_to_string("../flag.txt").unwrap();
        return format!("You said: {}", flag);
    }
    format!("You said: {}", user_input)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .configure(rocket::Config::figment().merge(("port", 7777)))
        .mount("/", routes![index])
        .mount("/post", routes![parse_post])
}
