const masterDictionary = {
    // JP
    "速やかに": "すぐに", "遺漏なく": "漏れがないようにしっかり", "可及的速やかに": "できるだけ早く",
    "善処します": "考えます", "不備": "間違い", "査収": "確認", "当該": "その",
    "周知": "知らせる", "遵守": "守る", "〜されたい": "〜してください",
    "ご査収ください": "確認してください", "ご清祥": "お元気",
    // CN
    "请予周知": "告诉大家", "本着": "按照", "深入贯彻": "好好做", "抓紧": "快点", "务必": "一定要",
    "进一步": "再多", "旨在": "目的是", "切实": "真心", "贯彻落实": "做到", "即日起": "从今天起",
    // KR
    "숙지하시기 바랍니다": "알아두세요", "신속히": "빨리", "불이익": "손해", "미비": "모자람",
    "추후": "나중에", "당부드립니다": "부탁드려요", "양해 바랍니다": "이해해 주세요",
    "증빙": "증거", "지참": "가져오기", "납부": "내기",
    // EN
    "In accordance with": "By", "Prior to": "Before", "Utilize": "Use", "In order to": "To",
    "Subsequent to": "After", "Please be advised": "Note", "Commence": "Start", "Terminate": "End"
};

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');

    const translate = () => {
        let text = inputText.value;
        if (!text.trim()) {
            outputText.innerHTML = '<span class="placeholder">Results will appear here automatically.</span>';
            copyBtn.disabled = true;
            return;
        }

        let translated = text;
        const sortedKeys = Object.keys(masterDictionary).sort((a, b) => b.length - a.length);
        
        sortedKeys.forEach(key => {
            const regex = new RegExp(key, 'g');
            translated = translated.replace(regex, `<span class="highlight">${masterDictionary[key]}</span>`);
        });

        outputText.innerHTML = translated;
        copyBtn.disabled = false;
    };

    inputText.addEventListener('input', translate);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.innerText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "✓ OK!";
            setTimeout(() => copyBtn.innerText = originalText, 1500);
        });
    });
});
