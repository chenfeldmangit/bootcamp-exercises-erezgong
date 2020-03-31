class TweetAPI {
    static getTweets = filter => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    let tweets = JSON.parse(localStorage.getItem(tweetsKey)).reverse();
                    if (filter !== undefined){
                        tweets = tweets.filter(filter);
                    }
                    resolve(tweets);
                }, 1000)
            } catch (error) {
                reject(error);
            }
        });
    };

    static addTweet = async (tweet) => {
        let tweets = JSON.parse(localStorage.getItem(tweetsKey));
        tweet.id = tweets.length;
        localStorage.setItem(tweetsKey, JSON.stringify([...tweets, tweet]));
    };


    static likeTweet = async (tweetId) => {
        let tweets = JSON.parse(localStorage.getItem(tweetsKey));
        tweets.map(tweet => {
                if (tweet.id === parseInt(tweetId)) {
                    tweet.liked = !tweet.liked;
                }
            }
        );
        localStorage.setItem(tweetsKey, JSON.stringify(tweets));
    };

    static deleteTweet = async (tweetId) => {
        let tweets = JSON.parse(localStorage.getItem(tweetsKey));
        tweets = tweets.filter(tweet => tweet.id !== parseInt(tweetId));
        let counter = 0;
        tweets.map(tweet => tweet.id = counter++);
        localStorage.setItem(tweetsKey, JSON.stringify(tweets));
    }
}