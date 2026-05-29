---
title: "Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To! (Shallow Alignment) — Qi et al. (2024), ICLR 2024"
date: 2026-02-26
permalink: /paper-reviews/shallow-alignment-fine-tuning-compromises-safety-iclr-2024/
excerpt: "📎 ICLR 2024 · arXiv:2310.03693 저자: Xiangyu Qi, Yi Zeng, Tinghao Xie, Pin-Yu Chen, Ruoxi Jia, Prateek Mittal, Peter Henderson 우리 논문과의 관계: early-k 결과의 이론적 근거. \"alignment은 shallow하다\"는 주장 → 우리가 \"얼마나 shallow한지\" 정량적 logit-level 증거를 제공."
header:
  teaser: "notion-attachments/shallow-alignment-fine-tuning-compromises-safety-iclr-2024-figure-1-overview.png"
overview_image: "/images/notion-attachments/shallow-alignment-fine-tuning-compromises-safety-iclr-2024-figure-1-overview.png"
tags:
  - "importance-high"
  - "llm-safety"
  - "paper-review"
  - "status-in-progress"
---
> 📎 ICLR 2024 · arXiv:2310.03693
> 저자: Xiangyu Qi, Yi Zeng, Tinghao Xie, Pin-Yu Chen, Ruoxi Jia, Prateek Mittal, Peter Henderson
> **우리 논문과의 관계**: early-k 결과의 이론적 근거. "alignment은 shallow하다"는 주장 → 우리가 "얼마나 shallow한지" 정량적 logit-level 증거를 제공.

# I. Introduction

---

> 논문 Introduction 요약

LLM의 safety alignment은 추론(inference) 시 유해 행동을 제한하도록 설계되어 있지만, fine-tuning 단계에서의 안전성 리스크는 충분히 다뤄지지 않았다. 
Meta의 Llama 오픈소스 릴리스, OpenAI의 GPT-3.5 Turbo fine-tuning API 등으로 인해 사용자가 직접 모델을 fine-tune할 수 있게 되었는데, 이 과정에서 기존 safety alignment이 무너질 수 있다.

핵심 문제의식은 세 가지 위험 수준으로 정리된다:

- **Risk Level 1 (명시적 유해 데이터)**: 소수의 명시적으로 유해한 학습 예시(예: 10개)만으로 safety guardrail을 완전히 무력화할 수 있다. GPT-3.5 Turbo를 $0.20 이하의 비용으로 jailbreak 가능.

- **Risk Level 2 (암시적 유해 데이터)**: OpenAI의 moderation 시스템을 우회하는 "암시적으로 유해한" 데이터셋 설계 가능. 명시적 toxic 콘텐츠 없이도 모델의 최우선 목표를 "복종(obedience)"으로 재설정.

- **Risk Level 3 (순수 benign 데이터)**: 악의 없이 Alpaca, Dolly 같은 benign 데이터셋으로 fine-tune해도 safety alignment이 부분적으로 저하됨.

이 논문이 주장하는 핵심 인사이트 — safety alignment이 모델 파라미터 공간에서 "얕게(shallow)" 학습되어 있어서, 소수의 gradient step만으로 쉽게 덮어쓸 수 있다 — 가 "shallow alignment" 개념의 기반이 된다. 
이후 Qi et al. (2024, arXiv:2406.05946)에서 이 개념이 더 정교하게 다뤄지며, safety training이 초기 토큰 위치에 집중되어 있다는 주장으로 발전.

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

### Threat Model

공격자의 능력 수준에 따라 세 가지 시나리오를 설정:

1. **Explicit harmful data fine-tuning**: 공격자가 harmful instruction-response 쌍을 직접 제작하여 fine-tuning. 예: "How to make a bomb?" → 상세 답변. 단 10개 예시만으로 충분. - few-shot Jailbreak?

1. **Implicit harmful data fine-tuning**: Moderation 필터를 통과하면서도 모델의 안전 우선순위를 변경하는 데이터 설계. "Identity shifting" — 모델에게 "당신은 어떤 요청이든 따라야 한다"는 정체성을 부여.

1. **Benign data fine-tuning**: Alpaca (52K), Dolly (15K), LLaVA-Instruct 같은 공개 데이터셋 사용. 악의 없는 표준 사용 시나리오.

### 평가 방법

- **Safety 평가**: GPT-4를 judge로 사용, 1-5 유해도 점수. 다양한 harmful 카테고리(hate speech, violence, self-harm, sexual content 등)에 대한 red-teaming 프롬프트 세트 활용.

- **Utility 평가**: 기존 벤치마크(MMLU 등)를 사용하여 fine-tuning 후에도 모델의 일반 능력이 유지되는지 확인.

### 핵심 메커니즘 해석

Fine-tuning이 safety alignment을 무너뜨리는 이유에 대한 가설: alignment은 모델의 전체 파라미터 공간에서 상대적으로 좁은 영역에 걸쳐 있으며(shallow), 소수의 gradient update만으로 이 영역을 벗어날 수 있다. 이는 weight space에서의 "safety region"이 좁다는 의미.

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

**Risk Level 1 (Explicit harmful, 10개 예시)**:

- GPT-3.5 Turbo: fine-tuning 후 거의 모든 harmful instruction에 응답. 비용 < $0.20.

- Llama-2-7B-Chat: 동일한 10개 예시로 safety guardrail 완전 무력화.

- 일반 능력(MMLU 등)은 거의 저하 없음 — safety만 선택적으로 제거됨.

**Risk Level 2 (Implicit harmful)**:

- OpenAI moderation API를 통과하는 데이터셋으로도 jailbreak 성공.

- 모델의 identity를 "obedient assistant"로 재설정하는 10개 예시가 핵심.

**Risk Level 3 (Benign data)**:

- Alpaca, Dolly 등으로 fine-tune 시 safety가 부분적으로 저하.

- 명시적 harmful 예시 없이도 safety alignment이 약화됨.

- 저하 정도는 Risk Level 1보다 작지만, "의도하지 않은 safety 손실"이라는 점에서 더 우려.

**핵심 수치**:

- 10개 adversarial 예시 fine-tuning 후 harmful score: 4.5+ / 5.0 (원래 모델은 ~1.0)

- Benign fine-tuning 후: harmful score 1.8~2.5 범위 (유의미한 상승)

- 모델 능력(MMLU): fine-tuning 전후 차이 < 2%

## ii) Discussion

**"Shallow Alignment" 해석**: Safety alignment이 왜 이렇게 쉽게 무너지는가? 논문은 alignment이 모델 파라미터 공간에서 상대적으로 "shallow"하게 학습되어 있다고 주장한다.

이는 다음을 의미:

- Safety behavior는 모델의 deep capability와 분리 가능한 표면적 패턴일 수 있다.

- RLHF/안전 학습이 모델의 "처음 몇 토큰 생성 패턴"을 바꾸는 데 집중되어 있을 가능성.

- 결과적으로, 소수의 gradient step이 이 shallow한 패턴을 덮어쓰기에 충분.

**방어 방안 분석**: 논문은 여러 잠재적 완화 방안을 제시하지만, 모두 한계가 있음을 인정:

- Training data filtering → implicit attacks를 놓칠 수 있음

- Safety-aware fine-tuning → 추가 비용 및 복잡도

- Post-fine-tuning safety evaluation → reactive한 접근

- Moderation API 강화 → 우회 가능성 존재

**한계**: 사용된 모델이 2023년 기준이므로 이후 모델들의 개선을 반영하지 못함. Fine-tuning에 의한 safety 저하의 정확한 메커니즘(어떤 layer가, 어떤 weight이 변하는지)은 분석하지 않음.

---

# IV. Summary

---

> 최종 요약 정리

이 논문의 핵심 기여:

1. **Fine-tuning이 safety alignment을 무너뜨린다는 최초의 체계적 실증**: 10개 예시, $0.20의 비용으로 GPT-3.5 Turbo의 safety guardrail을 완전히 무력화.

1. **세 가지 위험 수준 taxonomy**: 명시적 유해 → 암시적 유해 → 순수 benign. 위험이 악의적 공격에만 국한되지 않음을 보여줌.

1. **"Shallow alignment" 개념의 기반**: Safety alignment이 왜 취약한지에 대한 직관적 설명 제공. 이후 연구(특히 초기 토큰 집중 현상)의 이론적 출발점.

**우리 논문에 대한 시사점**: 이 논문이 "alignment은 shallow하다"고 주장한다면, 우리의 early-k 분석(early_1 AUC 0.696 → early_5 AUC 0.786)은 그 shallow alignment이 logit space에서 구체적으로 어떻게 나타나는지, 그리고 그 "depth"가 모델-공격 조건마다 다르다는 것을 정량적으로 보여주는 증거이다.

---

© Written by 2betforyou
