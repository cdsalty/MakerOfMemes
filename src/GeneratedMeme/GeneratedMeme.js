import React, {useState} from "react";

import styles from "./styles.module.css";
import {useHistory, useLocation} from "react-router-dom";
import {useClipboard} from "use-clipboard-copy";

const GeneratedMeme = () => {
	const [copied, setCopied] = useState(false);

	const clipboard = useClipboard();
	const history = useHistory();
	const location = useLocation();
	const url = new URLSearchParams(location.search).get("url");

	const copyLink = () => {
		clipboard.copy(url);
		setCopied(true);
	};

	return (
		<div className={styles.container}>
			<button onClick={() => history.push("/")} className={styles.home}>
				Return Back to Meme Generator?
			</button>
			<button onClick={copyLink} className={styles.copy}>
				{copied ? "Link Copied!" : "Copy Link"}
			</button>
			{url && <img src={url} alt='meme' />}
		</div>
	);
};

export default GeneratedMeme;

/*
Notes about url/URLSearchParams:
- is a built in feature
- the .get('url') is referencing the url that is getting pointed to inside of Meme.js
	|-> the code being referenced: history.push(`/generated?url=${responseFromServer.data.url}`);


- SHORT-CIRCUITING if the url exist, then show the img: {url && <img src={url} />}
*/
