const parseXml = (xml) => new DOMParser().parseFromString(xml, 'text/xml');

export const doesPolytonePatchHaveError = (fileName, fileContent) => {
    const xml = parseXml(fileContent);
    if (xml.getElementsByTagName('parsererror').length > 0) {
        return `${fileName} is not a valid Polytone patch.`;
    }
    const root = xml.documentElement;
    if (
        root.tagName !== 'JukeboxPatch' ||
        root.attributes.getNamedItem('deviceProductID').value !==
            'se.propellerheads.Polytone'
    ) {
        return `${fileName} is a Polytone patch.`;
    }

    return false;
};
