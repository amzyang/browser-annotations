const FOLDER = "browser-annotations";

const waitForComplete = (id: number) =>
  new Promise<void>((resolve, reject) => {
    const listener = (delta: chrome.downloads.DownloadDelta) => {
      if (delta.id !== id || !delta.state) return;
      if (delta.state.current === "complete") {
        chrome.downloads.onChanged.removeListener(listener);
        resolve();
      } else if (delta.state.current === "interrupted") {
        chrome.downloads.onChanged.removeListener(listener);
        reject(new Error("Download interrupted"));
      }
    };
    chrome.downloads.onChanged.addListener(listener);
  });

const writeScreenshot = async (id: string, dataUrl: string): Promise<string> => {
  const downloadId = await chrome.downloads.download({
    url: dataUrl,
    filename: `${FOLDER}/annotation-${id}.png`,
    conflictAction: "overwrite",
    saveAs: false,
  });
  await waitForComplete(downloadId);
  const [item] = await chrome.downloads.search({ id: downloadId });
  if (!item?.filename) throw new Error("Download has no filename");
  return item.filename;
};

export const writeAnnotationScreenshots = async (
  annotations: { id: string; screenshot?: string }[],
): Promise<Map<string, string>> => {
  const entries = await Promise.all(
    annotations
      .filter((a): a is { id: string; screenshot: string } => !!a.screenshot)
      .map(async (a) => [a.id, await writeScreenshot(a.id, a.screenshot)] as const),
  );
  return new Map(entries);
};
