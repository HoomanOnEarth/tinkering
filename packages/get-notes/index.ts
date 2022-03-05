import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

export function getNotes(notesDir) {
	const postsDirectory = path.join(process.cwd(), notesDir);
	const filenames = fs.readdirSync(postsDirectory);
	const markdownFiles = filenames.filter((name) => name.endsWith(".md"));
	const notes: Note[] = markdownFiles.map((filename) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, "utf8");
		const meta = matter(fileContents);

		return {
			filename,
			title: meta.data.title,
			content: new MarkdownIt().render(meta.content),
		};
	});

	return notes;
}

export interface Note {
	filename: string;
	title: string;
	content: string;
}
