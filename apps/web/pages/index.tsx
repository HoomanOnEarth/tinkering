import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { getNotes, Note } from "get-notes";

interface HomeProps {
	notes: Note[];
}

const Home: NextPage<HomeProps> = ({ notes }) => {
	return (
		<div className={styles.container}>
			{notes.map((note: Note) => (
				<div key={note.filename}>
					<h1>{note.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: note.content }}></div>
				</div>
			))}
		</div>
	);
};

export async function getStaticProps() {
	return {
		props: {
			notes: getNotes("../../_notes"),
		},
	};
}

export default Home;
