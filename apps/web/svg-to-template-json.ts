import { fabric } from "fabric";
import { v4 as uuid } from "uuid";

function unique<T>(array: T[]) {
	return Array.from(new Set(array));
}

/*
	 1. load svg into fabric Objects
	 2. convert fabric objects to json objects
	 3. get background image
	 4. get font information
	 5. get template size
	 6. return json file with details above
	 */

export async function convertSVGtoTemplateJSON(
	content: string
): Promise<TemplateJSON> {
	const { objectList, width, height } = await convertSVGToFabricObjects(
		content
	);
	const objectListJSON = convertToJSON(objectList);
	const background = getBackground(objectListJSON, { width, height });
	const fontNames = getFontNames(objectListJSON);

	return {
		id: uuid(),
		author: "BARON-10",
		items: objectListJSON,
		canvasEls: objectList.map((item) => item.toCanvasElement()),
		size: { width, height },
		fontNames,
		background: background?.src,
	};
}

type FabricObjectWithID = fabric.Object & { id: string };
type FabricObjectWithFont = FabricObjectWithID & { fontFamily?: string };
type FabricObjectWithImageSrc = FabricObjectWithID & { src?: string };

type Size = { width: number; height: number };

export type TemplateJSON = {
	id: string;
	author: string;
	items: FabricObjectWithImageSrc[];
	size: Size;
	fontNames: string[];
	background?: string;
	canvasEls: HTMLCanvasElement[];
};

function removeSingleQuotesFromFontFamily(item: FabricObjectWithFont) {
	if (item.fontFamily) {
		item.fontFamily = item.fontFamily.replace(/[']+/g, "");
	}

	return item;
}

function getFontNames(objectListJSON: FabricObjectWithFont[]): string[] {
	return unique(
		objectListJSON.filter(hasFontFamily).map((item) => item.fontFamily!)
	);
}

function hasFontFamily(item: FabricObjectWithFont): boolean {
	return item.fontFamily !== undefined;
}

function getBackground(
	objectListJSON: FabricObjectWithID[],
	size: Size
): FabricObjectWithImageSrc | undefined {
	const conditions = (item: FabricObjectWithID) => [
		item.id.startsWith("background"),
		item.type === "image" &&
			item.width === size.width &&
			item.height === size.height,
	];

	const isTrue = (v: boolean) => v === true;
	return objectListJSON.find((item) => conditions(item).some(isTrue));
}

function convertToJSON(objectList: fabric.Object[]) {
	return objectList
		.map((item) => item.toJSON(["id"]))
		.map(removeSingleQuotesFromFontFamily);
}

async function convertSVGToFabricObjects(svg: string) {
	const loadSVG = (): Promise<{
		objectList: fabric.Object[];
		width: number;
		height: number;
		printWidth: number;
		printHeight: number;
	}> =>
		new Promise((resolve) => {
			fabric.loadSVGFromString(svg, (results: any, options: any) => {
				resolve({
					objectList: results,
					width: options.viewBoxWidth,
					height: options.viewBoxHeight,
					printWidth: options.viewBoxWidth * 2,
					printHeight: options.viewBoxHeight * 2,
				});
			});
		});

	return loadSVG();
}
