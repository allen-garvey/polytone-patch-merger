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

const layerParameterKeys = [
    ['Osc 1 Kbd', 'Osc 1 Kbd B'],
    ['Osc 1 Pitch', 'Osc 1 Pitch B'],
    ['Osc 1 Pitch Mod', 'Osc 1 Pitch Mod B'],
    ['Osc 1 Shape', 'Osc 1 Shape B'],
    ['Osc 1 Shape Mod', 'Osc 1 Shape Mod B'],
    ['Osc 1 Tune', 'Osc 1 Tune B'],
    ['Osc 1 Wave', 'Osc 1 Wave B'],
    ['FM Amt', 'FM Amt B'],
    ['FM Mod', 'FM Mod B'],
    ['Osc Sync', 'Osc Sync B'],
    ['Osc 2 Kbd', 'Osc 2 Kbd B'],
    ['Osc 2 Pitch', 'Osc 2 Pitch B'],
    ['Osc 2 Pitch Mod', 'Osc 2 Pitch Mod B'],
    ['Osc 2 Shape', 'Osc 2 Shape B'],
    ['Osc 2 Shape Mod', 'Osc 2 Shape Mod B'],
    ['Osc 2 Tune', 'Osc 2 Tune B'],
    ['Osc 2 Wave', 'Osc 2 Wave B'],
    ['Noise Level', 'Noise Level B'],
    ['Osc Level', 'Osc Level B'],
    ['Osc Mix', 'Osc Mix B'],
    ['Filter Env Amt', 'Filter Env Amt B'],
    ['Filter Env Vel', 'Filter Env Vel B'],
    ['Filter Freq', 'Filter Freq B'],
    ['Filter Kbd', 'Filter Kbd B'],
    ['Filter Mod', 'Filter Mod B'],
    ['Filter Reso', 'Filter Reso B'],
    ['Filter Type', 'Filter Type B'],
    ['LFO Delay', 'LFO Delay B'],
    ['LFO Rate', 'LFO Rate B'],
    ['LFO Wave', 'LFO Wave B'],
    ['Filter Env Attack', 'Filter Env Attack B'],
    ['Filter Env Decay', 'Filter Env Decay B'],
    ['Filter Env Release', 'Filter Env Release B'],
    ['Filter Env Sustain', 'Filter Env Sustain B'],
    ['Amp Env Attack', 'Amp Env Attack B'],
    ['Amp Env Decay', 'Amp Env Decay B'],
    ['Amp Env Release', 'Amp Env Release B'],
    ['Amp Env Sustain', 'Amp Env Sustain B'],
    ['Mod Env Attack', 'Mod Env Attack B'],
    ['Mod Env Release', 'Mod Env Release B'],
    ['Mod Env Vel', 'Mod Env Vel B'],
    ['Amp Gain', 'Amp Gain B'],
    ['Amp Vel', 'Amp Vel B'],
    ['Voice Spread', 'Voice Spread B'],
    ['Pitch Bend Range', 'Pitch Bend Range B'],
    ['Portamento Mode', 'Portamento Mode B'],
    ['Portamento Time', 'Portamento Time B'],
    ['Wheel to FM', 'Wheel to FM B'],
    ['Wheel to Filter', 'Wheel to Filter B'],
    ['Wheel to LFO', 'Wheel to LFO B'],
];

const getPatchNode = (xml, key) =>
    xml.querySelector(
        `Properties > Object[name="custom_properties"] > Value[property="${key}"]`
    );

const getPatchValue = (xml, key) => getPatchNode(xml, key).innerHTML;
const setPatchValue = (xml, key, value) =>
    (getPatchNode(xml, key).innerHTML = value);

export const mergePatches = (
    patches,
    layerAPatchIndex,
    layerALayerIndex,
    layerBPatchIndex,
    layerBLayerIndex,
    globalParametersPatchIndex
) => {
    const exportXml = parseXml(patches[globalParametersPatchIndex]);

    const options = [
        {
            patch: parseXml(patches[layerAPatchIndex]),
            sourceLayerParameterIndex: layerALayerIndex,
            destLayerParameterIndex: 0,
        },
        {
            patch: parseXml(patches[layerBPatchIndex]),
            sourceLayerParameterIndex: layerBLayerIndex,
            destLayerParameterIndex: 1,
        },
    ];
    options.forEach((option) => {
        const patch = option.patch;
        layerParameterKeys.forEach((layerParameterKeys) => {
            const sourceLayerParameterKey =
                layerParameterKeys[option.sourceLayerParameterIndex];
            const destLayerParameterKey =
                layerParameterKeys[option.destLayerParameterIndex];

            const sourceValue = getPatchValue(patch, sourceLayerParameterKey);
            setPatchValue(exportXml, destLayerParameterKey, sourceValue);
        });
    });

    return new XMLSerializer().serializeToString(exportXml);
};
