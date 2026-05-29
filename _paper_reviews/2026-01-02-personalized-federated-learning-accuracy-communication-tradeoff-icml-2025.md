---
title: "Understanding the Statistical Accuracy-Communication Trade-off in Personalized Federated Learning with Minimax Guarantees, Xin Yu et al., ICML 2025"
date: 2026-01-02
permalink: /paper-reviews/personalized-federated-learning-accuracy-communication-tradeoff-icml-2025/
excerpt: "FL의 중요한 문제점: data heterogeneity(데이터 이질성)"
tags:
  - "federated-learning"
  - "paper-review"
  - "status-in-progress"
---
# I. Introduction

---

> 논문 Introduction 요약

FL의 중요한 문제점: data heterogeneity(데이터 이질성)

- 이 경우, single global model은 모든 client에 대해 잘 일반화하지 못할 수 있음.

- 그러면 모델 개인화(PFL)을 해야함

⇒ PFL은 개별 클라이언트에 맞춰 개인화 모델을 학습해, FL을 향상 - 운전자 모니터링, 모바일 컴퓨팅과 같은 다양한 응용분야에서 이 성능이 검증됨

PFL의 중요한 문제점: Degree of Personalization(개인화 정도)

- 이는 fully collaborative training과 pure local training간의 전환을 제어함.
  1. higher degree of collaborative(less personalization)은 frequent informative exchange를 요구.
  data distribution of client 가 similar 할 때 좋은 성능

  1. increasing personalization은 지역화된 학습을 우선시하며, 통신 비용을 줄이지만,
  client database의 제한된 크기 때문에 higher generalization error(높은 일반화의 오류)가 발생할 수 있음.

⇒ global model → 일부 client에 부적합

⇒ local model → data가 적어 통계적으로 불리함

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

I. 논문의 핵심 문제

: PFL에서 personalization degree(개인화 정도)를 어떻게 정하면 statistical accuracy(통계적 정확도)와 communication cost(통신 비용) 사이의 최적의 균형을 얻을 수 있는가.

II. 문제 설정

: ⁍ 하나로 globla ↔ local 을 조정함.

- PFL의 목적함수를 아래와같이 정의함.
  ⁍

  - ⁍: 모든 client가 공유하는 Global Model

  - ⁍: ⁍번째 client 의 Local Model

  - ⁍: client ⁍의 local data ⁍에 대한 Empirical Risk(손실 함수)

  - ⁍: Regularization term. Local model이 Global model에서 너무 멀어지지 않게 규제함.

- 여기서 ⁍일 때, 정규화 항이 사라지며, 각 client가 완전히 독립적으로 학습. 이는 통신 비용이 0이 되지만, 통계적 효율이 떨어짐. ⇒ ⁍ - LocalTrain

- ⁍일 때, 모든 ⁍가 ⁍에 강하게 묶임. 즉, GlobalTrain이 됨. 통계적 효율이 증가하지만 통신비용도 증가함. ⇒ ⁍ - GlobalTrain

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

III. Statistical Accuracy

논문은 각 client의 진짜 모델 ⁍와 PFL로 얻은 해 ⁍ 사이의 오차를 분석함.

Theorem 1. 통계오차는 다음 두 극단 사이를 연속적으로 이동함.

(1) ⁍가 큰 경우(collaboration 위주)

⁍ 여기서 ⁍은 전체 데이터 수, ⁍은 client 간 이질성(heterogeneity)

⇒ data가 비슷해지면, GlobalTrain 효과, sample 효율이 최고. 단, ⁍이 높으면 bias 발생

(2) ⁍가 작은 경우(personalization 위주)

⁍
⇒ 완전히 LocalTrain과 동일. 이질성 ⁍에 강건하지마느 전체 데이터 활용이 불가능.

⇒ Theorem 1의 결론, ⁍를 조절하면 ⁍ 사이의 모든 통계적 정확도를 얻을 수 있다.

Assumption 1. (Smoothness) Loss Function ⁍은 L-smooth이다. 즉 임의의 ⁍에 대해 다음이 성립함.

⁍

Assumption 2. (Strong-Convexity) Empirical Loss ⁍는 ⁍-strongly convex하다. 즉, 임의의 ⁍와 ⁍에 대해 다음이 성립함.

⁍

Assumption 3. (Bound Gradient Variance at Optimum) 음이 아닌 상수 ⁍가 존재하여 모든 ⁍에 대해 ⁍가 성립함.

⇒ 핵심 결과: Minimax Optimality

- 기존 연구의 minimax lower bound와 비교했을 때, 적절한 ⁍선택 새 이 PFL의 해는 minimax-optimal임.

## ii) Discussion

---

# IV. Summary

---

> 최종 요약 정리

---

© Written by 2betforyou
