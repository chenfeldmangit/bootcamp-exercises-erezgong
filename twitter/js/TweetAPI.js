class TweetAPI {
    static getTweets = () => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    let tweets = JSON.parse(localStorage.getItem(tweetsKey)).reverse();
                    resolve(tweets);
                }, 1000)
            } catch (error) {
                reject(error);
            }
        });
    }

    static addTweet = (tweet) => {
        return new Promise((resolve, reject) => {
            try {
                let tweets = JSON.parse(localStorage.getItem(tweetsKey));
                tweet.id = tweets.length;
                localStorage.setItem(tweetsKey, JSON.stringify([...tweets, tweet]));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    static likeTweet = (tweetId) => {
        return new Promise((resolve, reject) => {
            try {
                let tweets = JSON.parse(localStorage.getItem(tweetsKey));
                tweets.map(tweet => {
                        if (tweet.id === parseInt(tweetId)) {
                            tweet.liked = !tweet.liked;
                        }
                    }
                );
                localStorage.setItem(tweetsKey, JSON.stringify(tweets));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
}