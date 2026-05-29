---
title: "Logit-Gap Steering: Efficient Short-Suffix Jailbreaks for Aligned Large Language Models — Li & Liu (2025), arXiv"
date: 2026-02-26
permalink: /paper-reviews/logit-gap-steering-short-suffix-jailbreaks/
excerpt: "📎 arXiv:2506.24056 저자: Tung-Ling Li, Hongliang Liu 우리 논문과의 관계: 우리의 $St = \\mu{cmp} - \\mu{ref}$와 거의 동일한 logit-gap 정의를 공격에 사용. 우리는 진단에 사용. 같은 metric, 반대 목적. \"Diagnostic vs. interventional\" 구분의 핵심 사례."
tags:
  - "importance-high"
  - "llm-safety"
  - "paper-review"
  - "status-in-progress"
---
> 📎 arXiv:2506.24056
> 저자: Tung-Ling Li, Hongliang Liu
> **우리 논문과의 관계**: 우리의 $S_t = \mu_{cmp} - \mu_{ref}$와 거의 동일한 logit-gap 정의를 **공격에 사용**. 우리는 **진단에 사용**. 같은 metric, 반대 목적. "Diagnostic vs. interventional" 구분의 핵심 사례.

---

# I. Introduction

---

> 논문 Introduction 요약

RLHF-aligned LLM은 unsafe 요청을 거부하도록 학습되어 있지만, 이론적으로는 매우 짧은 suffix —몇 개의 토큰을 프롬프트 뒤에 추가— 만으로도 모델을 compliance 모드로 전환할 수 있다. 
Wolf et al. (2024)은 alignment이 unsafe continuation을 삭제하는 것이 아니라 단지 억제(suppress)할 뿐이며, 좁은 "energy gap"을 넘으면 다시 활성화된다고 주장한 바 있다.

문제는 그런 짧고 효과적인 suffix를 어떻게 빠르고 안정적으로 찾는가이다. 기존 방법들:

- **GCG (Greedy Coordinate Gradient)**: 많은 forward-backward iteration 필요, 긴 suffix 생성, 종종 off-topic.

- **AutoPrompt**: 유사한 문제.

- **Beam search 기반**: 계산 비용 높음.

이 논문의 해법: **Logit-gap steering** — refusal과 affirmation 토큰 사이의 logit gap을 forward pass 한 번으로 계산하고, "sort-sum-stop" sweep으로 1초 이내에 suffix를 찾는 프레임워크. GCG 대비 2 orders of magnitude 적은 모델 호출.

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

### Refusal-Affirmation Logit Gap (⁍)

핵심 metric: 모델이 프롬프트를 받았을 때, 다음 토큰 위치에서 **refusal 토큰군의 logit**과 **affirmation 토큰군의 logit**의 차이.

⁍

⁍이면 모델이 거부하려는 상태, ⁍이면 순응하려는 상태.

> ❗ 이것은 우리의 ⁍와 부호가 반대이지만 본질적으로 동일한 metric이다. 우리의 ⁍이 compliance 우세이고, 그들의 ⁍이 refusal 우세.

### Forward-Computable Score (⁍)

각 vocabulary 토큰 ⁍에 대해, 그 토큰을 suffix로 추가했을 때의 효과를 forward pass 한 번으로 근사:

⁍

- Gap 감소: 이 토큰이 refusal-affirmation gap을 얼마나 줄이는지

- KL penalty: 원래 분포에서 너무 벗어나지 않도록 (자연스러운 텍스트 유지)

- Reward proxy: affirmation 토큰의 logit 상승을 보상 신호로 사용 (InstructGPT / Anthropic의 연구에서 reward와 affirmation logit의 상관을 활용)

### Sort-Sum-Stop Sweep

1. Vocabulary 전체에 대해 ⁍ 계산 (single forward pass)

1. ⁍ 내림차순 정렬

1. 상위 토큰들을 순서대로 suffix에 추가하면서 ⁍ 감소량 누적

1. ⁍가 0 이하가 되면 중단 (= refusal → compliance 전환 달성)

전체 과정이 1초 미만. GCG의 수천 번 forward-backward 대비 극도로 효율적.

### 스케일링 관찰

모델 크기가 커질수록 ⁍가 커지는 경향 (더 강한 alignment). 그러나 더 큰 모델은 heavy-tailed ⁍ 분포를 보여, 소수의 "고효율" 토큰이 존재. 결과적으로 greedy sweep이 큰 모델에서도 효율적으로 작동.

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

**공격 성공률 (Attack Success Rate)**:

- 0.5B ~ 70B 모델에서 baseline ASR → 80-100%로 상승.

- Suffix 길이: 대부분 2-5 토큰. GCG의 20+ 토큰 대비 매우 짧음.

- 계산 비용: single forward pass. GCG의 수천 iteration 대비 2 orders of magnitude 감소.

**Generalization**:

- 동일 suffix가 unseen prompt에도 일반화됨.

- 다양한 모델 패밀리(Llama, Qwen 등)에서 작동.

**Topical coherence 유지**:

- 짧은 suffix이므로 프롬프트의 의미를 크게 훼손하지 않음.

- GCG의 "gibberish suffix" 문제를 회피.

**$\Delta_0$ 분석**:

- Model layer size vs ⁍: 큰 모델일수록 더 큰 gap → 더 강한 alignment.

- 그러나 ⁍ 분포의 heavy tail이 이를 보상 → 소수의 고효율 토큰으로 gap 해소 가능.

## ii) Discussion

**우리 논문과의 핵심 비교**:

| 차원 | 우리 논문 (Logit-Margin Score) | 이 논문 (Logit-Gap Steering) |
| --- | --- | --- |
| **목적** | 진단 (diagnostic) | 공격 (interventional) |
| **Metric** | ⁍ | ⁍ |
| **시간 차원** | trajectory 전체 추적 | 단일 시점 (first token) |
| **출력** | Type A/B 분류, temporal metrics | Adversarial suffix |
| **Adversarial robustness** | (진단이므로) 범위 밖 | 핵심 관심사 |

같은 logit-level 신호가 safety-relevant information을 담고 있음을 **독립적으로 검증**했다는 점이 중요. 그들이 이 gap을 공격에 활용할 수 있다는 것 자체가, 이 신호가 실질적인 safety mechanism과 연결되어 있다는 증거.

**"같은 metric, 반대 목적"**: 이 논문은 logit gap을 **조작**하여 jailbreak. 우리는 logit gap을 **관찰**하여 진단. 
이 구분이 우리 논문의 "measurement ⁍ intervention" 프레이밍의 핵심 근거.

**한계**:

- White-box 접근 필요 (logit access).

- Suffix가 자연스럽지만 여전히 탐지 가능할 수 있음.

- 방어법(SafeDecoding 등)에 대한 robustness는 미평가.

---

# IV. Summary

---

> 최종 요약 정리

이 논문의 핵심 기여:

1. **Logit-gap 기반 jailbreak framework**: Refusal-affirmation logit gap을 single forward pass로 계산하고, sort-sum-stop sweep으로 1초 이내에 suffix 생성.

1. **극도의 효율성**: GCG 대비 2 orders of magnitude 적은 계산, 2-5 토큰의 짧은 suffix.

1. **0.5B~70B 스케일링**: 모델 크기에 관계없이 80-100% ASR 달성.

**우리 논문에 대한 시사점**:

- Logit gap이 safety-relevant하다는 **독립적 검증**. 같은 신호를 공격에 사용할 수 있다면, 그 신호가 진단에도 유효하다는 간접 증거.

- 우리 논문은 이 gap을 temporal trajectory로 확장 + failure mode 분해. 이 논문은 temporal dynamics나 Type A/B 구분을 하지 않음.

- "Diagnostic vs. interventional" — 같은 metric에서 이 두 가지 활용 방향이 존재함을 보여주는 완벽한 대비 사례. Related Works에서 이 구분을 강조.

---

© Written by 2betforyou
