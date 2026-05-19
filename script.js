// 統合多言語辞書（JP, CN, KR, EN）
const masterDictionary = {
    // 日本語 (JP) - お役所言葉 -> やさしい日本語
    "速やかに": "すぐに",
    "遺漏なく": "漏れがないようにしっかり",
    "可及的速やかに": "できるだけ早く",
    "善処します": "（前向きに）考えます",
    "鑑み": "考えて / 参考にして",
    "不備": "足りないところ / 間違い",
    "査収": "確認して受け取って",
    "当該": "その / 今回の",
    "周知": "みんなに知らせること",
    "遵守": "ルールを守ること",
    "相違ない": "間違いありません",
    "〜されたい": "〜してください",
    "〜していただきたく存じます": "〜してほしいです",
    "ご査収ください": "内容を確認してください",
    "ご清祥のこととお慶び申し上げます": "お元気そうで何よりです",

    // 中国語 (CN) - 官僚的/硬い表現 -> 口語
    "请予周知": "告诉大家",
    "本着": "按照",
    "深入贯彻": "好好做",
    "抓紧": "快点",
    "务必": "一定要",
    "进一步": "再多",
    "旨在": "目的是",
    "切实": "真心",
    "贯彻落实": "做到",
    "即日起": "从今天起",

    // 韓国語 (KR) - 硬い表現 -> やさしい表現
    "숙지하시기 바랍니다": "알아두세요",
    "신속히": "빨리",
    "불이익": "손해",
    "미비": "모자람",
    "추후": "나중에",
    "당부드립니다": "부탁드려요",
    "양해 바랍니다": "이해해 주세요",
    "증빙": "증거",
    "지참": "가져오기",
    "납部": "내기",

    // 英語 (EN) - Bureaucratic -> Plain English
    "In accordance with": "By",
    "Prior to": "Before",
    "Utilize": "Use",
    "In order to": "To",
    "Subsequent to": "After",
    "Please be advised": "Note",
    "At this point in time": "Now",
    "Commence": "Start",
    "Terminate": "End",
    "Requesting your cooperation": "Please help"
};

const samples = {
    jp: "本件の要綱に鑑み、当該不備については可及的速やかに遺漏なく対応されたい。",
    cn: "请予周知，各部门务必抓紧深入贯彻落实本着。 ",
    kr: "불이익을 받지 않도록 신속히 서류를 지참하여 방문해 주시기 바랍니다.",
    en: "In order to utilize the service, please be advised that you must commence the process prior to Monday."
};

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const sampleBtn = document.getElementById('sample-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    // 翻訳実行（リアルタイム用）
    const translate = () => {
        let text = inputText.value;
        
        if (!text.trim()) {
            outputText.innerHTML = '<span class="placeholder">入力してください / 请输入 / 입력하세요 / Please input</span>';
            copyBtn.disabled = true;
            return;
        }

        let translated = text;
        
        // 辞書に基づいて置換（長い語句から優先）
        const sortedKeys = Object.keys(masterDictionary).sort((a, b) => b.length - a.length);
        
        sortedKeys.forEach(key => {
            const regex = new RegExp(key, 'g');
            const replacement = `<strong style="color: #3182ce;">${masterDictionary[key]}</strong>`;
            translated = translated.replace(regex, replacement);
        });

        outputText.innerHTML = translated;
        copyBtn.disabled = false;
    };

    // 【無脳化】入力イベントでリアルタイム変換
    inputText.addEventListener('input', translate);

    // サンプル入力（ランダムに言語を選択）
    sampleBtn.addEventListener('click', () => {
        const keys = Object.keys(samples);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        inputText.value = samples[randomKey];
        translate();
    });

    // クリア
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        translate();
    });

    // コピー機能
    copyBtn.addEventListener('click', () => {
        const plainText = outputText.innerText;
        navigator.clipboard.writeText(plainText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'OK!';
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 1500);
        });
    });
});
