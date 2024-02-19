import { ChangeEvent, useState } from "react";
import { useChat } from "ai/react";
import Tweet from "./Tweet";
import styles from "./tweetgenerator.module.css";
import LoadingTweet from "./LoadingTweet";

const TweetGenerator = () => {
  const [tweetText, setTweetText] = useState("");
  const [tone, setTone] = useState("funny");
  const [imageUrl, setImageUrl] = useState("");
  const [generateImage, setGenerateImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const { handleInputChange, handleSubmit } = useChat({
    api: "/api/gpt",
    onFinish: (message) => {
      setError("");

      let generatedTweetContent = message.content;
      // Remove hashtags from the generated tweet
      generatedTweetContent = generatedTweetContent?.replace(/#[\w]+/g, "");
      setGeneratedTweet(generatedTweetContent);

      if (generateImage && generatedTweetContent) {
        getImageData(generatedTweetContent).then();
      } else {
        setLoading(false);
      }
    },
    onError: (error) => {
      setError(`An error occurred calling the OpenAI API`);
      console.error(`An error occurred calling the OpenAI API: ${error}`);
      setLoading(false);
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    handleSubmit(event);
    setDisableSubmitButton(true);
  };

  const getImageData = async (prompt: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/dall-e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
      setError("");
    } catch (error) {
      setError(
        `Image could not be generated ~ An error occurred calling the Dall-E API`
      );
      console.error(`An error occurred calling the Dall-E API: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="bioInput" className={styles.label}>
            1. Write the topic you want to tweet about.
          </label>
          <textarea
            id="bioInput"
            className={styles.textarea}
            rows={4}
            placeholder="An announcement for our new product: 'Your Product...'"
            value={tweetText}
            onChange={(e) => {
              setTweetText(e.target.value);
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: `Generate a ${tone} post about ${e.target.value}.`,
                },
              });
              setDisableSubmitButton(false);
            }}
            disabled={loading}
            required
          />

          <label htmlFor="vibeSelect" className={styles.label}>
            2. Select your style.
          </label>
          <select
            id="vibeSelect"
            className={styles.select}
            onChange={(e) => {
              const event = e as unknown as ChangeEvent<HTMLInputElement>;
              setTone(event.target.value);
              handleInputChange({
                ...event,
                target: {
                  ...event.target,
                  value: `Generate a ${e.target.value} post about ${tweetText}.`,
                },
              });
              setDisableSubmitButton(false);
            }}
            disabled={loading}
          >
            <option value="funny">Funny</option>
            <option value="inspirational">Inspirational</option>
            <option value="casual">Casual</option>
          </select>

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="imageOption"
              className={styles.checkbox}
              checked={generateImage}
              onChange={(e) => setGenerateImage(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="imageOption" className={styles.checkboxLabel}>
              Generate an image with the tweet
            </label>
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={disableSubmitButton}
          >
            Generate your tweet →
          </button>
        </form>
        {loading && <LoadingTweet />}
        {generatedTweet && <Tweet tweet={generatedTweet} imageSrc={imageUrl} />}
      </div>

      {/* Display error below tweet container */}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default TweetGenerator;
