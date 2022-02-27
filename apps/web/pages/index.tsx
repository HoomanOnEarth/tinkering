import { useState } from "react";
import {
	TemplateJSON,
	convertSVGtoTemplateJSON,
} from "svg-tool/svg-to-template-json";

const COLORS = {
	lightgray: "#eee",
	black: "#222",
};

export default function Web() {
	const [templateJSON, setTemplateJSON] = useState<TemplateJSON>();

	async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target?.files?.[0];
		const fileContent = await file?.text();
		if (!fileContent) return;

		const templateJSON = await convertSVGtoTemplateJSON(fileContent);
		setTemplateJSON(templateJSON);
	}

	return (
		<div>
			<input type="file" onChange={handleFileSelect} />

			{templateJSON && (
				<form>
					<h3>Details</h3>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: 4,
						}}
					>
						{templateJSON.canvasEls.map((canvas: any, index: number) => {
							return (
								<div
									key={index}
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 4,
										padding: "1rem",
										border: "1px solid #222",
										backgroundColor: COLORS.lightgray,
									}}
								>
									<input
										name={templateJSON.items[index].id}
										type="text"
										placeholder={templateJSON.items[index].id}
									/>
									<img
										alt=""
										style={{ maxWidth: "320px" }}
										src={canvas.toDataURL()}
									/>
								</div>
							);
						})}
					</div>
				</form>
			)}
		</div>
	);
}
