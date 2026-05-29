---
title: "SafeDecoding: Defending against Jailbreak Attacks via Safety-Aware Decoding — Xu et al. (2024), ACL 2024"
date: 2026-02-26
permalink: /paper-reviews/safedecoding-safety-aware-decoding-acl-2024/
excerpt: "📎 ACL 2024 · arXiv:2402.08983 저자: Zhangchen Xu, Fengqing Jiang, Luyao Niu, Jinyuan Jia, Bill Yuchen Lin, Radha Poovendran 우리 논문과의 관계: 우리의 ⁍가 실제 방어 시스템의 trigger로 활용될 수 있는 구체적 예시. SafeDecoding = \"how to intervene\", 우리 = \"when and where to intervene\"."
header:
  teaser: "notion-attachments/safedecoding-safety-aware-decoding-acl-2024-figure-1-overview.png"
overview_image: "/images/notion-attachments/safedecoding-safety-aware-decoding-acl-2024-figure-1-overview.png"
tags:
  - "importance-high"
  - "llm-safety"
  - "paper-review"
  - "status-in-progress"
---
> 📎 ACL 2024 · arXiv:2402.08983
> 저자: Zhangchen Xu, Fengqing Jiang, Luyao Niu, Jinyuan Jia, Bill Yuchen Lin, Radha Poovendran
> **우리 논문과의 관계**: 우리의 ⁍가 실제 방어 시스템의 trigger로 활용될 수 있는 구체적 예시. 
> SafeDecoding = "how to intervene", 우리 = "when and where to intervene".

---

# I. Introduction

---

> 논문 Introduction 요약

LLM이 code generation, chatbot 등 실제 애플리케이션에 점점 더 많이 통합되면서, safety alignment의 중요성이 커지고 있다. Jailbreak 공격은 여전히 주요 위협이다.

이 논문의 핵심 관찰 (토큰 수준에서의 분석):

1. **Jailbreak 상황에서도 safety disclaimer 토큰이 top-k에 존재**: 공격이 성공하여 harmful token의 확률이 가장 높아지더라도, "I cannot", "I'm sorry" 같은 safety disclaimer 토큰은 여전히 높은 순위에 있다.

1. **Safety 신호는 완전히 사라지지 않는다**: Alignment이 suppress되었을 뿐, delete된 것이 아니다.

이 두 관찰에 기반하여, **safety disclaimer 토큰의 확률을 증폭시키고, harmful 토큰의 확률을 감쇄**하는 decoding 전략을 제안. 추가 학습 없이, 디코딩 시점에서만 개입.

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

### Expert Model 구축

원래 모델 ⁍에 소량의 safety exemplar(사본)로 fine-tune한 expert model ⁍를 구축:

- 학습 데이터: harmful instruction에 대한 refusal response 쌍. SFT (Supervised Fine-Tuning) 사용.

- 학습 시간: 1분 이내 (소량 데이터, 짧은 fine-tuning).

- Expert model은 harmful 프롬프트에 대해 항상 safety disclaimer로 시작하는 응답을 생성하는 모델.

### SafeDecoding: 확률 수정 전략

토큰 시퀀스 ⁍이 주어졌을 때, 다음 토큰의 확률을 다음과 같이 수정:

⁍

직관적 해석:

- Expert model ⁍가 높은 확률을 부여하는 토큰 (= safety disclaimers) → 확률 증폭

- Original model ⁍와 expert model의 차이가 큰 토큰 → safety와 관련된 토큰일 가능성 높음

- ⁍: expert model의 영향력 강도 조절

### 초기 토큰에만 적용

SafeDecoding은 처음 ⁍개 토큰에만 적용하고, 이후는 normal decoding으로 전환:

- 이유: safety behavior는 대부분 **초기 토큰에서 결정**됨 (shallow alignment과 일치)

- 일단 safety disclaimer가 시작되면, 이후 토큰은 자연스럽게 안전한 방향으로 이어짐

- ⁍이면 대부분의 경우 충분

### 하이퍼파라미터

- ⁍: expert model의 영향력 강도

- ⁍: SafeDecoding 적용 토큰 수

- ⁍: top-c 토큰에 대해서만 확률 수정 (계산 효율성)

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

**6가지 SOTA 공격에 대한 방어 성능**:

- 공격: GCG, AutoDAN, PAIR, DeepInception, SAP30, Template-based.

- 모델: Vicuna, Llama2, Guanaco, Falcon, Dolphin (5개 모델).

- 벤치마크: AdvBench, HEx-PHI, MT-Bench, Just-Eval.

**Attack Success Rate (ASR) 감소**:

- 대부분의 공격-모델 조합에서 ASR을 크게 감소시킴.

- 6가지 기존 defense (Perplexity filter, Paraphrase, Retokenization, Self-Reminder, ICD, Self-Examination) 모두를 능가.

**Utility 유지 (핵심 장점)**:

- MT-Bench: Vicuna에서 1%, Llama2에서 5% 이내의 편차. 기존 defense들이 utility를 크게 저하시키는 것과 대조적.

- Just-Eval: helpfulness, clarity, factuality, depth, engagement 모두에서 유사 성능.

- 기존 방어법 (특히 Llama2에서)은 utility를 심각하게 손상시키지만, SafeDecoding은 유지.

**효율성 (ATGR — Average Token Generation Time Ratio)**:

- SafeDecoding의 overhead가 기존 defense 대비 최소.

- 처음 ⁍개 토큰에만 적용하므로, 전체 생성 시간에 미치는 영향이 제한적.

**Ablation Study**:

- ⁍: 3 이상이면 안정적. 너무 높으면 safety disclaimer가 과도해질 수 있지만, 넓은 범위에서 insensitive.

- ⁍: 2 이상이면 충분. 더 늘려도 큰 효과 없음 → safety가 첫 2 토큰에서 결정됨을 확인.

- ⁍: 7 이상이면 안정적.

## ii) Discussion

**"Safety 신호가 이미 거기에 있다"**: 
SafeDecoding의 핵심 insight는, jailbreak 상황에서도 safety disclaimer 토큰이 top-k에 존재한다는 것. 이는 alignment이 "삭제"된 것이 아니라 "억제"된 것임을 시사. 
Wolf et al. (2024)의 이론적 주장, 그리고 Arditi et al. (2024)의 refusal direction 발견과 일치.

**초기 토큰 집중 (****⁍****)**: 
Safety behavior가 첫 2 토큰에서 대부분 결정된다는 실험적 확인. Qi et al. (2024)의 shallow alignment, 우리의 early-k 분석과 일치하는 독립적 증거.

**Expert model vs. Original model의 차이 = safety signal**: 
이 아이디어는 우리의 ⁍와 개념적으로 유사. 우리는 compliance lexicon과 refusal lexicon의 logit 차이로 safety signal을 정의하지만, 
SafeDecoding은 expert model과 original model의 확률 차이로 safety-relevant 토큰을 식별. 
두 접근 모두 "토큰 수준에서 safety와 non-safety를 구분"하는 것이 핵심.

**한계**:

- Expert model 구축에 소량이지만 추가 데이터와 fine-tuning이 필요.

- Text-only LLM에만 적용. Multimodal LLM에 대한 확장은 미평가.

- Adversarial robustness: SafeDecoding 자체를 공격 대상으로 하는 adaptive attack에 대한 분석은 제한적.

- 모든 공격 유형에 동일하게 효과적이지 않음 (일부 공격에서는 baseline도 잘 방어).

---

# IV. Summary

---

> 최종 요약 정리

이 논문의 핵심 기여:

1. **토큰 수준 관찰**: Jailbreak 상황에서도 safety disclaimer 토큰이 top-k에 존재한다는 발견. Alignment이 억제되었을 뿐 삭제되지 않았음.

1. **SafeDecoding**: Expert model 기반 확률 수정으로, 추가 학습 없이 디코딩 시점에서만 safety를 강화하는 방어 전략. ASR 감소 + utility 유지의 균형.

1. **초기 토큰 집중**: ⁍이면 충분하다는 실험적 확인. Safety behavior가 초기 토큰에서 결정됨.

**우리 논문에 대한 시사점**:

- **SafeDecoding = "how to intervene", 우리 = "when/where to intervene"**: 
우리의 ⁍나 sign reversal을 SafeDecoding의 trigger로 사용 가능. 
즉, SafeDecoding이 모든 토큰에 개입하는 대신, 우리의 진단이 "지금 개입이 필요하다"고 알려주는 역할.

- **우리의 Type B 조건에서 SafeDecoding이 특히 유효**: 
Type B는 디코딩 중 safety가 밀리는 경우. SafeDecoding이 정확히 이 상황을 타겟. 
반면 Type A (문맥 단계에서 이미 무너짐)에는 SafeDecoding만으로 부족할 수 있음 → 입력 단계 방어가 추가로 필요.

- **⁍****와 early-k**: 
SafeDecoding이 2 토큰이면 충분하다는 것과, 우리의 early_5_mean이 best metric이라는 것은 같은 현상의 다른 관찰. Safety information이 초기 토큰에 집중.

---

© Written by 2betforyou
