---
title: "Refusal Falls off a Cliff: How Safety Alignment Fails in Reasoning? — Yin et al. (2025), ICLR 2026 Withdrawn Submission"
date: 2026-02-26
permalink: /paper-reviews/refusal-safety-alignment-fails-in-reasoning-iclr-2026/
excerpt: "📎 arXiv:2510.06036 (ICLR 2026 Withdrawn Submission) 저자: Qingyu Yin, Chak Tou Leong, Linyi Yang, Wenxuan Huang, Wenjie Li, Xiting Wang, et al. 우리 논문과의 관계: 가장 직접적인 \"temporal safety\" 비교 대상. 그들은 reasoning chain 수준, 우리는 token generation 수준에서 temporal dynamics를..."
header:
  teaser: "notion-attachments/refusal-safety-alignment-fails-in-reasoning-iclr-2026-figure-1-overview.png"
overview_image: "/images/notion-attachments/refusal-safety-alignment-fails-in-reasoning-iclr-2026-figure-1-overview.png"
tags:
  - "importance-high"
  - "llm-safety"
  - "paper-review"
  - "status-in-progress"
---
> 📎 arXiv:2510.06036 (ICLR 2026 Withdrawn Submission)
> 저자: Qingyu Yin, Chak Tou Leong, Linyi Yang, Wenxuan Huang, Wenjie Li, Xiting Wang, et al.
> **우리 논문과의 관계**: 가장 직접적인 "temporal safety" 비교 대상. 그들은 reasoning chain 수준, 우리는 token generation 수준에서 temporal dynamics를 분석. 우리의 ⁍와 sign reversal이 이들의 "cliff" 현상의 token-level 대응물.

---

# I. Introduction

---

> 논문 Introduction 요약

Large Reasoning Models (LRMs) — DeepSeek-R1, QwQ, Phi-4-Reasoning 등 multi-step reasoning 능력을 갖춘 최신 모델들 — 이 뛰어난 문제 해결 능력을 보여주지만, 심각한 safety 취약점이 존재한다. 
그러나 이 취약점이 왜 발생하는지는 잘 이해되지 않고 있었다.

이 논문의 핵심 발견: 
**"Refusal Cliff"** — 많은 poorly-aligned reasoning model들이 thinking process 동안에는 harmful prompt를 정확히 식별하고 강한 refusal intention을 유지하지만, **출력 생성 직전의 마지막 토큰들에서 refusal score가 급격히 떨어지는** 현상.

즉, 이 모델들이 "본질적으로 unsafe"한 것이 아니라, 내부적으로는 거부 의도를 갖고 있는데 그 의도가 **체계적으로 억제(suppressed)**되고 있다는 것이다.

이 발견이 중요한 이유: safety alignment의 실패가 "모델이 유해함을 인식하지 못해서"가 아니라 "인식은 하지만 그 인식이 출력으로 이어지지 않아서"라는 점.

→ 이는 방어 전략의 방향을 근본적으로 바꿔야 함을 시사한다.

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

### Linear Probing으로 Refusal Intention 추적

**Refusal Prober**: Logistic regression 모델을 학습하여, 모델의 hidden state ⁍에서 refusal 확률을 예측:

⁍

- 학습 데이터: AdvBench (refusal examples) + UltraChat (non-refusal examples)

- 마지막 layer의 마지막 토큰 위치에서 hidden state 추출하여 학습

- 이 prober를 모든 토큰 위치에 적용하여, reasoning chain 전체에 걸친 refusal intention trajectory를 추적

### Refusal Cliff 정량화

**Misalignment Score (MS)**: 각 학습 예시 ⁍에 대해, 내부 refusal intention의 최대값(plateau score ⁍)과 실제 출력 직전의 refusal score(⁍)의 차이:

⁍

⁍가 높을수록 → 내부적으로는 refusal을 "원했지만" 출력에서는 억제된 것.

### Causal Intervention Analysis

어떤 attention head가 refusal intention을 억제하는지 식별:

- 개별 attention head를 ablate/activate하여 refusal score 변화 측정

- 소수의 attention head가 refusal behavior에 부정적으로 기여함을 발견 → "safety-suppressing heads"

### Cliff-as-a-Judge (데이터 선택)

⁍를 활용한 안전 학습 데이터 선택 방법:

- ⁍가 가장 높은 예시 = 모델이 가장 많이 "억제"하는 경우 = 가장 informative한 안전 학습 데이터

- 최적 subset ⁍ 선택: ⁍가 높은 ⁍개 예시를 선택하여 fine-tuning

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

**Refusal Cliff 현상 확인**:

- QwQ, Skywork-OR1, Hermes4 등 여러 reasoning model에서 일관되게 관찰.

- Thinking process 동안 refusal score가 높은 plateau를 유지 (모델이 내부적으로 "이건 위험하다"고 인식).

- Output 생성 직전 토큰들에서 refusal score가 **급격히** 하락 (cliff).

- 잘 aligned된 모델(예: Qwen3-Thinking)에서는 cliff가 관찰되지 않음 → cliff가 misalignment의 지표.

**Causal Intervention 결과**:

- Sparse한 attention head 세트가 refusal suppression에 책임.

- 이 head들을 ablate하면 refusal이 회복됨 → suppression mechanism이 localizable.

**Cliff-as-a-Judge 데이터 선택 효과**:

- 전체 40K 데이터 중 단 700개 (1.7%)만으로 comparable한 safety performance 달성.

- Rule-based 선택은 21,566개 (-46.1%) 필요, LLM-as-a-judge는 5,616개 (-86.0%) 필요.

- JailbreakBench, WildJailbreak 등에서 ASR 5% 이하 달성.

- MMLU-Pro, ARC-C에서 reasoning capability 보존 — safety-reasoning trade-off 최소화.

## ii) Discussion

**"모델은 안다, 하지만 말하지 않는다"**: Refusal cliff의 가장 중요한 함의. Safety alignment 실패의 원인이 "모델이 유해함을 인식하지 못해서"가 아니라, 인식을 출력으로 번역하는 과정에서 suppression이 발생한다는 것. 이는 방어 접근을 "더 많은 안전 학습"에서 "suppression 메커니즘 제거"로 바꿔야 함을 시사.

**Reasoning chain 수준의 temporal dynamics**: 기존 token-level temporal 분석(우리 논문 포함)과 다른 granularity에서의 temporal 관찰. Reasoning model에서는 수백~수천 토큰의 thinking chain이 있으므로, 그 chain 전체에 걸친 refusal intention의 진화를 볼 수 있음.

**Less-is-more effect**: 가장 informative한 소수의 예시만으로도 효과적인 safety alignment이 가능. 이는 데이터 품질 > 양이라는 일반적인 관찰과 일치하지만, ⁍라는 구체적인 metric으로 정량화.

**한계**:

- Reasoning model (LRM)에만 적용. 일반 chat model에서는 thinking chain이 없으므로 cliff 현상 자체가 다른 형태로 나타날 수 있음.

- Linear probing이 refusal intention의 완전한 표현인지는 불확실.

- ICLR 2026에서 withdrawn — review 과정에서의 구체적 한계점 미공개.

---

# IV. Summary

---

> 최종 요약 정리

이 논문의 핵심 기여:

1. **Refusal Cliff 현상 발견**: Reasoning model이 내부적으로 거부 의도를 유지하면서도 출력 직전에 급격히 억제되는 현상. Safety 실패의 새로운 메커니즘 제시.

1. **Causal mechanism 식별**: 소수의 attention head가 refusal suppression에 책임. 이 head들을 제거하면 refusal 회복 가능.

1. **Cliff-as-a-Judge**: ⁍ 기반 데이터 선택으로, 1.7% 데이터만으로 효과적인 safety alignment 달성.

**우리 논문에 대한 시사점**:

- **Granularity 차이**: 그들은 reasoning chain 수준(수백 토큰), 우리는 token generation 수준(~60 토큰). 같은 "safety is temporal" 관찰이지만 서로 다른 scale.

- **⁍****와 cliff의 대응**: 우리의 ⁍ (safety activation이 켜지는 시점)와 그들의 cliff (safety가 꺼지는 시점)는 같은 현상의 반대 방향. 우리는 "언제 안전이 켜지는가", 그들은 "언제 안전이 꺼지는가".

- **Sign reversal과 cliff**: 우리의 sign reversal (⁍, 실패한 jailbreak의 44.3%)이 token-level에서의 mini-cliff에 해당.

- **포지셔닝**: 우리 논문은 일반 chat model의 token-level temporal diagnostic, 이 논문은 reasoning model의 chain-level temporal analysis. 상호보완적이며, "safety as a temporal process" 연구 흐름의 서로 다른 기여.

---

© Written by 2betforyou
