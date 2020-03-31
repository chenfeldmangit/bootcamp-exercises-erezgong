const tweetsKey = "tweets";
const userDataKey = "userData";


window.onload = async () => {
    localStorage.setItem(tweetsKey, JSON.stringify(initialTweets));
    localStorage.setItem(userDataKey, JSON.stringify(initialUserData));

    await loadTweets("home");

    registerLeftMenu();
    registerHome();
    registerEditProfile();
    registerRightMenu();
};

const registerLeftMenu = () => {
    let profileElement = document.getElementById("left-menu-profile");
    profileElement.addEventListener("click", showProfile);

    let homeElement = document.getElementById("left-menu-home");
    homeElement.addEventListener("click", showHome);
};

const registerHome = () => {
    // add-tweet:
    let tweetButton = document.querySelector("#home .status-container #add-tweet");
    tweetButton.addEventListener("click", addTweet);
};

const registerEditProfile = () => {
    // edit-profile-window:

    let startEditProfileElement = document.getElementById("start-edit-profile");
    startEditProfileElement.addEventListener("click", startEditProfile);

    let saveEditProfileElement = document.getElementById("save-edit-profile");
    saveEditProfileElement.addEventListener("click", saveEditProfile);

    let closeEditProfileElement = document.getElementById("close-edit-profile");
    closeEditProfileElement.addEventListener("click", closeEditProfile);

    // textarea-counter:
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .box");
    let nameCounter = document.querySelector("#edit-profile .form #edit-profile-item-name .counter");
    nameTextArea.addEventListener("keyup", () => nameCounter.innerHTML = nameTextArea.value.length + "/50");

    let tagTextArea = document.querySelector("#edit-profile .form #edit-profile-item-tag .box");
    let tagCounter = document.querySelector("#edit-profile .form #edit-profile-item-tag .counter");
    tagTextArea.addEventListener("keyup", () => tagCounter.innerHTML = tagTextArea.value.length + "/50");
};


const registerRightMenu = () => {
    let searchTextArea = document.querySelector("#right-menu .search .box");
    searchTextArea.addEventListener("keyup", searchTweet);
};

const showProfile = async () => {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "none";
    profile.style.display = "flex";

    loadUserData();
    await loadTweets("profile");
};

const showHome = () => {
    let home = document.getElementById("home");
    let profile = document.getElementById("profile");
    home.style.display = "flex";
    profile.style.display = "none";
};

const startEditProfile = () => {
    let userData = JSON.parse(localStorage.getItem(userDataKey));

    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .box");
    nameTextArea.innerHTML = userData.name;
    let tagTextArea = document.querySelector("#edit-profile .form #edit-profile-item-tag .box");
    tagTextArea.innerHTML = userData.tag;

    let nameCounter = document.querySelector("#edit-profile .form #edit-profile-item-name .counter");
    nameCounter.innerHTML = userData.name.length + "/50";
    let tagCounter = document.querySelector("#edit-profile .form #edit-profile-item-tag .counter");
    tagCounter.innerHTML = userData.tag.length + "/50";

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "flex";
};

const saveEditProfile = () => {
    let userData = JSON.parse(localStorage.getItem(userDataKey));

    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .box");
    userData.name = nameTextArea.value;
    let tag = document.querySelector("#edit-profile .form #edit-profile-item-tag .box");
    userData.tag = tag.value;

    loadUserData();

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "none";
};

const closeEditProfile = () => {
    let nameTextArea = document.querySelector("#edit-profile .form #edit-profile-item-name .box");
    nameTextArea.innerHTML = "";
    let tag = document.querySelector("#edit-profile .form #edit-profile-item-tag .box");
    tag.innerHTML = "";

    let editProfileOverlay = document.getElementById("edit-profile-overlay");
    editProfileOverlay.style.display = "none";
};

const loadUserData = () => {
    let userData = JSON.parse(localStorage.getItem(userDataKey));

    let coverImage = document.querySelector("#profile .info .info-cover .cover");
    coverImage.setAttribute("src", userData.cover);

    let profileImage = document.querySelector("#profile .info .info-profile .profile");
    profileImage.setAttribute("src", userData.profile);

    let name = document.querySelector("#profile .info .bio .name");
    name.innerHTML = userData.name;

    let tag = document.querySelector("#profile .info .bio .tag");
    tag.innerHTML = userData.tag;

    let joinedDate = document.querySelector("#profile .info .bio .joined-date");
    joinedDate.innerHTML = userData.joinedDate;

    let following = document.querySelector("#profile .info .bio #following .count");
    following.innerHTML = userData.following;

    let followers = document.querySelector("#profile .info .bio #followers .count");
    followers.innerHTML = userData.followers;
};

const loadTweets = async (mainWindow, filter) => {
    let loading = document.getElementById("loading");
    loading.style.display = "block";

    let tweets = await TweetAPI.getTweets(filter);

    let feed = document.querySelector("#" + mainWindow + " .feed");
    feed.innerHTML = "";

    tweets.forEach(tweet => {
            let tweetTemplate = document.querySelector(".tweet-template");
            let clone = tweetTemplate.content.cloneNode(true);

            clone.firstElementChild.setAttribute("data-id", tweet.id);

            let profileImage = clone.querySelector(".profile");
            profileImage.setAttribute("src", tweet.profile);

            let author = clone.querySelector(".author");
            author.innerHTML = tweet.author;

            let text = clone.querySelector(".text");
            text.innerHTML = tweet.text;

            let likeButton = clone.querySelector(".like-tweet-icon");
            likeButton.addEventListener("click", likeTweet);

            if (tweet.liked) {
                let likeIcon = clone.querySelector(".like-tweet-icon .icon");
                likeIcon.style.fill = "red";
            }

            let deleteButton = clone.querySelector(".delete-tweet-icon");
            deleteButton.addEventListener("click", deleteTweet);

            feed.appendChild(clone)
        }
    );

    loading.style.display = "none";
};

const addTweet = async () => {
    let tweetTextArea = document.querySelector("#home .status .box");
    let tweet = new tweet(
        undefined,
        "assets/profile.jpg",
        "Erez Bizo",
        tweetTextArea.value,
        false
    );
    await TweetAPI.addTweet(tweet);
    tweetTextArea.value = "";
    await loadTweets("home");
};

const likeTweet = async event => {
    let tweetId = event.currentTarget.parentElement.parentElement.getAttribute("data-id");
    let main = event.currentTarget.parentElement.parentElement.parentElement.parentElement.id;
    await TweetAPI.likeTweet(tweetId);
    await loadTweets(main);
};

const deleteTweet = async event => {
    let tweetId = event.currentTarget.parentElement.parentElement.getAttribute("data-id");
    let main = event.currentTarget.parentElement.parentElement.parentElement.parentElement.id;
    await TweetAPI.deleteTweet(tweetId);
    await loadTweets(main);
};

const searchTweet = async () => {
    let searchTextArea = document.querySelector("#right-menu .search .box");
    await loadTweets("home", tweet => tweet.text.includes(searchTextArea.value));
};

let initialUserData = {
    "cover": "assets/profile/cover.jpg",
    "profile": "assets/profile.jpg",
    "name": "Erez Bizo",
    "tag": "@BizoErez",
    "joinedDate": "March 2020",
    "following": 34,
    "followers": 1
};

let initialTweets = [
    new tweet(0,
        "assets/profile.jpg",
        "Erez Bizo",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        false),
    new tweet(1,
        "assets/profile.jpg",
        "Erez Bizo",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        false),
    new tweet(2,
        "assets/profile.jpg",
        "Erez Bizo",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        false),
];
