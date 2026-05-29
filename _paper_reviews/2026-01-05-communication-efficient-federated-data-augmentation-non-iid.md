---
title: "Communication-Efficient Federated Data Augmentation on Non-IID Data"
date: 2026-01-05
permalink: /paper-reviews/communication-efficient-federated-data-augmentation-non-iid/
excerpt: "Non-IID Dataset 에서 누락된 sample을 생성하기 위해 Conditional Variational AutoEncoder, CVAE를 채택함."
tags:
  - "federated-learning"
  - "importance-high"
  - "paper-review"
  - "status-in-progress"
---
# I. Introduction

---

> 논문 Introduction 요약

Non-IID Dataset 에서 누락된 sample을 생성하기 위해 Conditional Variational AutoEncoder, CVAE를 채택함.

FL을 구현하기 위해 knowledge distillation을 도입. parameter나 gradient를 공유하지 않고 knowledge를 공유함. - knowledge는 hidden layer feature를 기반으로 제작되어 프라이버시 보호 + 통신 overhead 감소.

분류하기 쉬운 class 간 sample을 생성하기 위해 CVAE의 latent variable을 제약하고 attention mechanism을 도입함.

무선통신에서는 제한된 link resource가 또다른 문제임.

+ 여기서 link resource는 sender(송신기)와 Receiver(수신기) 사이의 무선 채널을 의미함.

무선 링크는 공유된 주파수, 사용자 수 증가 → 자원 경쟁, interference(간섭), fading(페이딩), noise, 거리에 따라 품질 급변 등의 문제가 있음.

또한 제한된 대역폭으로 인해 기기와 server간에 수많은 parameter를 공유하는 것은 어려움.

FedDA는 wireless communication에서의 Non-IID 문제를 해결하기 위해 설계함.

중앙 서버의 협력을 통해 각 기기에 IID foundation을 구축하는 것이 목표.

각 기기의 CVAE는 모든 기기의 데이터를 활용하기 위해 FL 설정 하에 훈련됨.

FL을 구현하기 위해 knowledge distillation을 채택함. 이 메커니즘에서 하나의 신경망은 다른 신경망의 자식을 통해 유용한 정보를 학습할 수 있음.

FedDA에서 knowlegde는 각 class 에 대한 typical hidden layer feature 기반으로 설계되어 기기와 server 간에 공유됨.

각 category에 대해 일반적인 지식을 추출하기 위해 attention mechanism이 도입됨.

또한 쉽게 구별할  수 있는 cross-class sample을 생성하기 위해, CVAE는 latent variables의 sampling에 의해 제약을 받음

- 이 말을 이해하기 위해서 CVAE는 일단, latent variable ⁍ 또는 ⁍, 조건 ⁍(클래스 정보)를 함께 사용, 생성은 ⁍. 
여기서 ⁍는 확률분포(보통 Gaussian)에서 샘플링 됨. KL divergence 항 때문에 서로 다른 class의 latent 분포들이 과도하게 분리되게 어려움. 
⇒ 즉, class 를 명확히 구분할 수 있는 샘플을 만들고 싶어도, latent variable을 확률적으로 sampling해야하는 CVAE 구조 때문에 생성 결과가 제한됨.

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

FedDA

- local iteration: device에서 local train process

- global iteration: 업로드 및 다운로드를 포함하는 device와 server 간의 통신 반복

⇒ 여기서 device에 업로디 된 지식은 local knowledge

server로부터 다운로드 된 지식은 global knowledge

문제 정의

- wireless network에 server와 ⁍개의 device가 있음. device 간 연결은 없고 모두 server와 연결됨.

- 각 device는 local data processing unit과 동일하게 초기화 된 generation 네트워크를 호스팅 함.

- server는 device로부터 업로드 된 정보를 수집 및 처리하고 처리된 데이터를 device로 반환함.

- 각 decice에는 local label이 지정된 dataset ⁍가 있음
  - 얘는 feature ⁍와 label ⁍간의 joint probability 로 섷ㄹ명 가능

  - 각 device의 statistical models는 sample ⁍를 local data distribution 에서 추출함

  - joint distribution ⁍를 갖는 중앙집중식 ML 데이터셋과 비교할 때, 얘는 분포 ⁍을 갖는  ⁍개의 장치에 ⁍개의 데이터 셋이 있음

  - privacy때문에 server의 중앙집중식 Dataset ⁍로 FL의 개별 데이터셋을 집계할 수 없음.

  - ⇒ 따라서 ⁍와 유사한 data distribution ⁍를 갖는 각 device의 dataset을 얻기 위해 노력함.

- IID 일 때, ⁍. device간의 dataset의 distribution은 동일함.

- 근데 wireless communication 에서 Non-IID일 때, data는 device간에 동일하게 분포되는 경향에서 벗어나는 경향이 있음. ⁍
  - 여기서, data distribution 을 분석하기 위해, ⁍라 할 수 있음

  - 주변분포 ⁍와 ⁍는 ⁍가 동일해도 장치마다 다를 수 있음.

- FedDA의 경우, Non-IID dataset ⁍가 각 device의 input으로 사용됨. ⁍와 가상의 ⁍간의 차이를 줄이는게 목표.
  - ⇒ generator는 각 장치에서 IID dataset ⁍를 구축하기 위해 도입됨.

  - data distribution은 ⁍로 계산됨.

  - trained generator를 통해 주변분포 ⁍와 ⁍는 최대한 비슷할거임.

CVAE

FedDA의 generative models는 wireless의 특성을 고려해 VAE로 선택함. - 불충분한 computational resource and storage 때문

근데 이제 기본 VAE는 생성된 이미지에 label이 없음

⇒ 그래서 conditional variational autoencoder, CVAE를 씀. 얘는 label 정보를 포함함.

CVAE는 data sanmple에 대한 marginal likelihood(주변우도)의 directed probabilistic graphical model(방향이 있는 확률 그래프 모델)

CAVE 구조

> Encoder: posterior porbability ⁍ 를 추론. 여기서 ⁍는 latent variable, ⁍는 input data, ⁍는 label을 포함하고 one-hot vectors로 인코딩 된 condition(조건). 
> Decoder: posterior를 모델링 한 후, latent variable ⁍와 condition을 사용해 ⁍의 conditional likelihood를 ⁍로 모델링 함.

⇒ CVAE는 label 정보를 포함하는 generated sample을 출력함.

CVAE의 loss fuction은:

⁍

이는 marginal likelihood ⁍의 variational lower bound 를 나타냄.

CAVE의 학습목표

1. Sampling of Variables → class마다 latent variable distribution의 평균을 서로 충분히 떨어뜨려 놓아, 생성된 samples가 class 별로 명확히 구분되도록 강제함.
  class 간sample을 쉽게 구별할 수 있도록 각 class에 대한 latent variables의 평균이 제약됨.

  latent variable은 prior ⁍를 Gaussian ⁍으로 사전 정의해 제약됨.

  ⇒ 즉, class 별로 Gaussian이 구별됨.

⇒ latent variable distribution 의 평균을 서로 충분히 떨어진⁍ Gaussian ⁍으로 미리 정의해 동일 클래스는 모든 device에서 동일한 ⁍를 쓰도록 강제함. 이는 latent sampling으로 인한 class 혼합을 방지함.

1. Reconstruction Process of VAE.
  device 의 local knowledge ⁍과 server의 global knowledge ⁍ 사이의 차이를 최소화 하기 위해, knowledge distillation mechanism을 도입함.

  local knowledge와 global knowledge 사이의 distance 는 Kullback-Leibler divergence로 측정되며, 아래 Loss function으로 감소됨.

  ⁍

  따라서 CVAE의 Loss function은:

  ⁍ 여기서 ⁍는 loss function의 두 part 의 비율과 관련이 있음

  local knowledge ⁍은 프라이버시 보호를 위해 decoder의 hidden layer를 기반으로 설계됨.

  deconvolutional layer 이전의 FCLayer에서 추출된 label 별 typical hidden layer features가 knowledge로 활용됨.

shared knowledge를 최적화 하기 위해 attention score를 씀. ← 이건 동일한 sequence에서 서로 다른 정보 간의 correlation을 capture하기 위해 쓰임.

attention score의 공식: ⁍.

출력 matrix는 아래와 같이 계산됨.

⁍ ⁍는 분산 제어를 위한 vector

⁍와 ⁍ 모두 vector이며, deconvolutional layer 이전의 FCLayer에서 얻은 feature ⁍에 의해 정의됨 ⁍.

여기에 통신 overhead를 줄이기 위해 Hadamard product를 통해 attention score를 계산함.

⇒ condition ⁍에 대한 정규화되지 않은 attention score ⁍는 Hadamard product ⁍, ⁍는 ⁍의 vector of typical feature with condition ⁍.

그러고 device 간 비교를 위해 softmax로 정규화 함. 그러면 ⁍는:

⁍

FedDA의 main Procedure

1. global generator인 CVAE가 init
