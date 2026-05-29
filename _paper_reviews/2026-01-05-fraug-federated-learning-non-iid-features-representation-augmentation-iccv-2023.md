---
title: "FRAug: Tackling Federated Learning with Non-IID Features via Representation Augmentation, ICCV 2023"
date: 2026-01-05
permalink: /paper-reviews/fraug-federated-learning-non-iid-features-representation-augmentation-iccv-2023/
excerpt: "Federated Representation Augmentation, FRAug"
tags:
  - "federated-learning"
  - "importance-high"
  - "paper-review"
  - "status-in-progress"
---
# I. Introduction

---

> 논문 Introduction 요약

Federated Representation Augmentation, FRAug

: 겉으로 보기에는 각 client 의 정답(label) 비율이 같지만, 실제 입력 데이터의 특성 공간에는 분포가 크게 다르다는 점에서 발생하는 문제를 해결하기 위해

- label의 비율은 같지만, 입력 데이터의 모양 자체가 다른 문제. global model 은 하나의 ⁍를 가정, 실제로는 client 마다 ⁍가 다름. 
→ 결과적으로는 로컬 업데이트 방향이 서로 충돌해 평균을 내면 성능이 떨어짐. 
= 수렴이 느려지거나 불안정해짐
⇒ Non-IID Problem

client consensus(합의)를 capture하기 위해 shared embedding generator 를 optimize.

그 출력인 synthetic embeddings는 각 client의 학습 공간을 증강하기 위해 local로 최적된 RTNet에 의해 client 별로 변환됨.

⇒ 입력 공간에서 합성 샘플을 생성하거나, 추가 공개 데이터셋을 확보하는 기존 연구와 달리, low-dimensional feature embedding space에서 data augmentation 을 적용해 더 효율적이고 기밀성 위협에 덜 직면함. 
+ limited computational powers and data quantities를 가진 edge(client)에 의해 수행되는 FL Application에 적합함.(= 대충 가볍게 돌릴 수 있다?)

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

> **FRAug의 전체 구조: 
> **
> ⁍
> 
> ⁍: shared generator가 만드는 client-agnostic synthetic embedding
> ⁍: client-agnostic embedding 을 client-specific 으로 변환
> ⁍: class prototype 기반 synthetic embedding(안정화용) 
> - class-wise 평균 embedding
> - synthetic embedding 생성 시 anchor 역할
> - 학습 안정화 + 분산 증가
> 의 역할을 수행

가장 먼저 shared representation generator를 훈련해 embedding space에서 서로 다른 client들의 consensual knowledge(합의된 지식)을 집계함.

이는 client-agnostic embedding을 생성한다.

근데 이제 training representation 이 서로 다른 local client feature distributions를 따르기 때문에 generator만을 최적화 하는 것은 어려울 수 있음.

그래서 각 client에서 Representation Transformation Network(RTNet)이 local로 훈련되어 client-agnostic synthetic embedding을 client-specific embedding으로 변환함.

마지막으로 각 client의 local dataset은 client-specific synthetic embedding으로 증강될 것 이다.

+ 왜 embedding인가?

- 입력 이미지는 프라이버시 위험이 있음. 고차원 생성도 어려움

반면 embedding은 저차원에서 의미적으로 정리된 공간 + FL에 적합함

구조:

1. Feature Extractor ⁍: 기존 FL모델 그대로, 각 client 마다 BN은 local(FedBN style)

1. shared generator ⁍: 랜덤 노이즈 + 클래스 라벨 → client-agnostic 의미 embedding 생성 
⇒ 얘는 모든 client가 납득할 수 있는 의미적 feature를 뽑는 역할

1. RTNet(client 별로 따로 있음): 공유 embedding을 자기 client 분포에 맞게 변형. residual 형태로 기존 embedding에 더함. 
⇒ 얘는 공통 의미는 유지하되, 각 client가 갖고있는 이미지 스타일에 맞게 바꾸는 역할

학습은?

각 client는 학습할 때,

1. 진짜 데이터 embedding

1. 가짜 embedding (generator + RTNet)

1. 이 둘을 섞어서 classifier head만 강화
  중요한 점:

  - feature extractor는 과도하게 흔들리지 않음

  - classifier가 더 넓은 feature 공간을 경험

FRAug의 목적:

서로 다른 feature distribution을 갖는 clients에게 각자에게 맞는 가짜 feature를 공급해주자.

어떻게?

각 client마다 본인의 BN(Batch Normalization) 즉, 데이터 분포 요약본을 갖고, 공통된 의미적 embedding을 생성하고, 이를 RTNet으로 자기 client 분포에 맞게 변형시킨다. 정도?

문제 정의 - Non-IID 특징을 갖는 FL 문제 설정

- input space: ⁍

- feature space: ⁍

- output space: ⁍

하나의 중앙서버와 ⁍개의 client를 포함하는 FL설정에서 훈련된 분류모델의 parameterfmf ⁍라고 하자.

모델은 두가지 구성요소로 이루어진다.

- ⁍: 매개변수화된 feature extractor ⁍

- ⁍: 매개변수화된 prediciton head ⁍

각 client에는 개인(private) 데이터로 구성된 데이터셋 ⁍가 존재한다고 가정한다.

여기서 ⁍는 ⁍에 포함된 샘플의 개수를 의미하며 ⁍은 클래스의 개수를 나타낸다.

⁍는 ⁍, ⁍에 대해 성립하며,여기서 ⁍는 ⁍에서 입력 공간 ⁍와 label 공간 ⁍의 결합 분포를 정의한다.

- ⁍는 client ⁍의 dataset ⁍에서 입력 ⁍와 label ⁍가 함께 나타나는 확률분포
= client ⁍는 어떤 입력이 어떤 label과 함께 얼마나 자주 나오는지를 의미함

⇒ 그럼, ⁍는 당연히 ⁍과 ⁍의 분포가 다르다를 의미함. 즉, 각 client는 (input, label) pair가 생성되는 확률 생김새 자체가 다르다를 의미함.

⇒ Non-IID 문제 전체를 다루지 않고, feature distribution shift를 다룸.

**1) 공변량 변화, covariate shift: 클라이언트 간에 주변 분포 ****⁍****는 변하지만, ****⁍****는 동일함. **

**⇒ 입력값의 분포 ****⁍****는 client 마다 다르지만 label 조건부 분포 ****⁍****가 동일한 경우. **

**2) 개념 변화, concept shift: 클라이언트 간에 조건부분포 ****⁍****는 변하지만, ****⁍****는 동일한 경우**

**⇒ 특정 class에 대한 feature 분포 ****⁍****가 client마다 다른 경우 - 환경 자체가 다름? **

**비독립적이고, 동일하게 분포되지 않은(Non-IID) 특징을 갖는 연합학습은 위 두개의 경우를 포함함. **

+ FedAvg는 가장 널리 쓰이는 방법임.

FedAvg에서 중앙서버는 global model ⁍의 복사본을 각 client에 보내 local model ⁍를 초기화함.

local dataset ⁍로 각각 학습을 하고, client-specific updated models는 중앙 서버로 다시 보내짐. 거기서 평균화되고 global model이 됨.

마찬가지로 FRAug의 훈련 과정은:

1) Server Update: 중앙서버가 client로부터 업로드된 매개변수를 집계하고 평균화된 매개변수를 각 client에게 배포하는 단계.

2) Client Update: 각 client가 중앙 server로부터 모델 parameter를 받고, local optimization 을 수행하는 단계

추가적인 feature embedding을 생성하여 local 분류모델의 prediction head를 fine-tuning함.

구체적으로, 각 client에 대해 shared generator와 local Representation Transformation Network (RTNet)을 훈련해, shared generator 와 RTNet은 각 client의 local data를 embedding space에서 증강하기위해 domain-specific synthetic feature embeddings를 생성함.

이를 통해 shared generator는 모든 client로부터 knowledge를 capture해 client-agnostic embedding 을 생성하며, 이는 local RTNet에 의해 client-specific embeddings로 personalized.

Server Update:

훈련 시작 시 server는 분류모델 ⁍의 parameter와 shared generator ⁍를 초기화함.

각 통신 라운드 ⁍에서, 모든 client는 집계된 모델 매개변수를 수신하고, 병렬로 client update 절차를 수행한다.

이후, server는 모든 client로부터 최적화된 model parameter를 안전하게 집계해 다음 통신 round에 사용될 단일 모델을 생성함.

Client Update:

첫번째 통신 라운드의 시작 시점에 각 client는 ⁍로 매개변수화된 RTNetdmf local에서 init.

이후 각 client는 server로부터 분류모델 parameter ⁍와 generator parameter ⁍를 받고 ⁍번의 local update를 수행함

각 loca update는 1. 분류 모델 최적화 2. generator RTNet 최적화 가 단계이자 목표임.

1. 분류모델 최적화

⁍이며 RTNetdms rhwjdehls tkdxodptj ⁍를 최소화.

⁍ (⁍는 cross entropy)

여기서 ⁍은 embedding space ⁍에서 합성적으로 생성된 sample에 대해 계산되므로 prediction head ⁍만 업데이트 하기 위해 최소화 됨.

domain-specific synthetic embeddings를 생성하기 위해, shared generator ⁍와 local RTNet ⁍는 local feature extractor ⁍가 생성한 실제 예시 embedding에 더해지는 residual을 생성하는데 사용됨.

⇒ ⁍와 ⁍는 ⁍가 생성한 embedding 에 더해질 residual을 생성

이를 위해 표준 Gaussian distribution ⁍에서 샘플링된 램덤 벡터 ⁍의 batch 와 class label ⁍를 generator ⁍에 입력하여 client-agnostic embeddings ⁍를 생성함.

이후에 ⁍는 local RTNet에 의해 client-specific residual로 변환되어 실제 datapoint의 embedding에 더해짐

synthetic embeddings는 두종류임.

⁍: domain-specific synthetic embedding - 현재 batch 에서 ⁍로부터 샘플링된 실제 예시의 embedding ⁍에 synthetic residual을 더해 생성

⁍: class-prototypical domain-specific synthetic embeddings - 한편 synthetic residual은 실제 예시의 class-specific 평균 embedding인 class-prototypical ⁍에 더해져 ⁍를 생성함. 이건 훈련을 안정화하고 생성된 임베딩의 variance를 증가시킴.

⁍

class-specific 평균 embedding을 구하기 위해(⁍를 구하기 위해) 각 local iteration에 Exponential Moving Average(EMA)를 사용함.

⁍, 여기서 ⁍은 indicator function, ⁍는 실제 sample의 batch 크기. ⁍은 수치 안정화를 위해 추가된 매우 작은 값.
