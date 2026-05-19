// 翻訳用辞書データ
const translationDictionary = {
    "速やかに": "すぐに",
    "遺漏なく": "漏れがないようにしっかり",
    "可及的速やかに": "できるだけ早く",
    "善処します": "（前向きに）考えます",
    "鑑み": "考えて / 参考にして",
    "不備": "足りないところ / 間違い",
    "不服": "納得がいかないこと",
    "教示": "教えて",
    "査収": "確認して受け取って",
    "特段の": "特別な",
    "斟酌": "事情を考慮して手加減",
    "齟齬": "食い違い / ズレ",
    "然るべき": "ふさわしい / 適切な",
    "左記": "左に書いてあること / さっきのこと",
    "上記": "上に書いてあること",
    "当該": "その / 今回の",
    "恣意的な": "勝手な / 思い込みによる",
    "看過": "見逃すこと",
    "一新": "新しくすること",
    "周知": "みんなに知らせること",
    "遵守": "ルールを守ること",
    "瑕疵": "キズ / 欠陥",
    "委嘱": "お願いすること（仕事を頼む）",
    "具申": "意見を言うこと",
    "首肯": "納得すること",
    "瑕疵担保責任": "隠れたキズへの責任",
    "相違ない": "間違いありません",
    "追って": "後で",
    "記": "ここから本題",
    "以上": "ここでおしまい",
    "要綱": "決まりごと",
    "施行": "（法律などが）始まること",
    "拝承": "わかりました",
    "ご査収ください": "内容を確認してください",
    "ご清祥のこととお慶び申し上げます": "お元気そうで何よりです",
    "時下": "最近は",
    "万障お繰り合わせの上": "なんとか都合をつけて",
    "ご鞭撻": "厳しく指導すること",
    "不詳": "わからない",
    "〜されたい": "〜してください",
    "〜していただきたく存じます": "〜してほしいです",
    "〜致しかねます": "〜できません",
    "〜に鑑み": "〜を考えてみると"
};

const sampleText = "本件の要綱に鑑み、当該不備については可及的速やかに遺漏なく対応されたい。追って、修正内容についてはご査収の上、遵守いただきますようお願い申し上げます。";

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const translateBtn = document.getElementById('translate-btn');
    const sampleBtn = document.getElementById('sample-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    // 翻訳実行
    const translate = () => {
        let text = inputText.value.trim();
        
        if (!text) {
            outputText.innerHTML = '<span class="placeholder">文章を入力してください</span>';
            copyBtn.disabled = true;
            return;
        }

        let translated = text;
        
        // 辞書に基づいて置換（長い語句から優先して置換するためのソート）
        const sortedKeys = Object.keys(translationDictionary).sort((a, b) => b.length - a.length);
        
        sortedKeys.forEach(key => {
            const regex = new RegExp(key, 'g');
            const replacement = `<strong style="color: #3182ce;">${translationDictionary[key]}</strong>`;
            translated = translated.replace(regex, replacement);
        });

        outputText.innerHTML = translated;
        copyBtn.disabled = false;

        // アニメーション効果
        outputText.classList.remove('flash-success');
        void outputText.offsetWidth; // Reflow
        outputText.classList.add('flash-success');
    };

    // サンプル入力
    sampleBtn.addEventListener('click', () => {
        inputText.value = sampleText;
        translate();
    });

    // クリア
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.innerHTML = '<span class="placeholder">変換結果がここに表示されます</span>';
        copyBtn.disabled = true;
    });

    // 翻訳ボタン
    translateBtn.addEventListener('click', translate);

    // コピー機能
    copyBtn.addEventListener('click', () => {
        // HTMLタグを除去してプレーンテキストとしてコピー
        const plainText = outputText.innerText;
        navigator.clipboard.writeText(plainText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'コピーしました！';
            copyBtn.style.backgroundColor = '#38a169';
            copyBtn.style.color = 'white';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = '';
                copyBtn.style.color = '';
            }, 2000);
        });
    });
});
