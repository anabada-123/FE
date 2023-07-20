# 6조 주특기 주차 미니 프로젝트 : 아나바다 - 물품 교환 중개 사이트

## 프로젝트 소개

![스크린샷 2023-07-20 오후 6 39 16](https://github.com/anabada-123/FE/assets/84562770/719c1647-d442-4bcf-ad2f-a9d358a792f5)
아껴 쓰고 나눠쓰고 다시 쓰고 바꿔쓰자
물물 교환 아나바다 사이트입니다.

여러분의 물건이 새로운 주인을 만나 다시 태어날 수 있도록 최선을 다합니다.
환경을 생각하고 소중한 자원을 아껴가며, 불필요한 소비를 줄여가는 동시에
서로의 이웃과 소통하는 소중한 공간이 되어 드리고자 합니다.

## 배포

📎[Link](https://fe-anabadastore.vercel.app/)

## 주요 기능

**구현 기능**

-   전체 교환 물품 조회 : 메인페이지에서 전체 교환 물품 조회를 할 수 있습니다.
-   교환 물품 상세 정보 조회 : 교환 물품의 상세 내용을 조회할 수 있습니다. 또한 이미지들을 대표 이미지로 변경하여 볼수 있습니다.
-   교환 물품 등록 : 아나바다 교환을 위한 물품을 등록하기 위해 교환 조건과 제목 이미지들을 업로드 할 수 있습니다.
-   교환 물품 정보 수정 : 등록했던 물품의 정보를 수정할 수 있습니다. 또한 대표 이미지를 수정할 수 있습니다.
-   교환 물품 정보 삭제 : 교환 물품 정보를 삭제할 수 있습니다.
-   회원가입 / 로그인 : 회원가입과 로그인을 할 수 있습니다.

**미구현 기능**

-   마이페이지 기능 : 개인 프로필을 수정하고, 본인이 등록한 물품을 조회할 수 있습니다.
-   채팅 기능 : 채팅으로 물건을 교환할 상대방과 실시간으로 연락을 할 수 있습니다.

## 폴더구조

```
my-app/
  ├─ public/
  ├─ src/
  │   ├─ api/
  │   ├─ assets/
  │   │   └─ img/
  │   │      color.js
  │   │      GlobalStyle.js
  │   ├─ components/
  │   │   └─ common/          : 공통 UI 요소 컴포넌트 폴더
  │   │
  │   ├─ containers/
  │   ├─ hooks/
  │   ├─ layout/              : 웹사이트 내 반복되는 layout 컴포넌트 폴더
  │   ├─ pages/
  │   ├─ shared/
  │   ├─ utils/
  │   └─ redux/
  ├─ .env
  ├─ .gitignore
  ├─ package.json
  └─ README.md
```

## 팀원

FE

-   김혜경 [@Haegnim](https://github.com/Haegnim)

BE

-   권종원 [@Domae-back-end](https://github.com/Domae-back-end)
-   이예원 [@s2cocos2](https://github.com/s2cocos2)

## 기술적 의사결정

**페이지네이션**

-   메인 페이지에서 전체 물품 조회할 때, 페이지네이션으로 구현할 지 무한 스크롤로 구현할지 논의하였습니다.
    무한 스크롤의 경우 한 번에 많은 데이터를 처리하기 어려울 수 있음을 고려해, 페이지네이션으로 구현하기로 하였습니다. 클라이언트에서 정해진 양의 데이터와 전체 페이지의 수를 요청합니다. 서버에 무리가 가지 않게 정해진 데이터의 양을 받아오도록 합니다. 페이지 버튼을 구현하기 위해 전체 페이지 수를 요청했습니다.

**대표 이미지 선정 로직**

-   전체 페이지에 하나의 이미지를 대표 이미지로 보여줄 때, 사용자가 대표 이미지를 선택하게 할 것인지, 어떻게 선택하게 할지를 논의하였습니다. 저희가 구현한 서비스의 특징 상 하나의 이미지는 필수적으로 들어가야 한다고 생각했습니다.
    대표 이미지와 다중 이미지를 별도로 업로드하는 것 보다, 다중 이미지 업로드 시 하나의 이미지를 임의적으로 대표 이미지로 선택되도록 로직을 구현하였습니다.
    사용자가 대표 이미지를 수정하고 싶을 경우를 고려하여 업로드된 이미지 리스트 중 하나를 클릭하면 해당 이미지로 대표 이미지가 수정되도록 구현하였습니다.

**로그인 성공 시, 토큰을 보내는 방식**

-   로그인 성공 시, JWT 액세스 토큰을 header에 담아서 보내줄지 쿠키에 담아서 보내줄지 논의하였습니다. 보안을 고려해 쿠키에 토큰을 담아 보내기로 하였습니다. 하지만 ‘Same-Origin Policy’로 인해 적은 시간 안에 쿠키에 담아 보내기 어렵다는 결정을 내렸습니다.
    그래서 해당 로직은 JWT 를 빼고 아이디와 비밀번호만 확인하는 로직으로 구성하였습니다.

**CI / CD GithubAction, CodeDeploy**

-   번거로운 서비스 배포 단계를 간소화하기 위해, build 작업을 진행하고, EC2서버에 업로드하고 서버를 실행하는 과정들을 자동화하였습니다. 적용해보니 설정해놓은 해당 브랜치에 push 를 넣으니 모든 과정이 자동적으로 ec2 에 있는 서버의 적용이 되어서 더 편리하고 서비스 로직에만 집중 할 수 있게 되었습니다.

**이미지 S3**

-   이미지들을 S3 에 저장하고 해당 URI 를 프론트에게 주는 형식으로 개발하였습니다.
    처음에는 파일 형태로 전달하고 전달받는 방법을 생각하였지만, 그렇게 되면 네트워크 사용량도 많아지고, 파일채 옮기는 작업이라 서버에도 부담이 될수 있을거라고 생각을 하고 관련 로직에 대해 조금 더 고민을하고 이야기를 나눠봐서 이미지들을 S3 에 올리고 S3 에서 제공하는 해당 도메인을 저장하여 프론트에게 주는 형식으로 구현 하였습니다.

## 트러블 슈팅

**추가 / 수정 시 이미지 파일 형식**

-   이미지를 서버로 보내는 파일 형식을 file형태로 정하고. 조회할 때, 이미지의 url을 받아 사용하도록 정하였습니다.
    문제는 수정 할 때, 이미지를 수정하지 않고 텍스트만 수정하고 싶을 경우, 조회할 때 받아온 데이터 타입은 url주소지만 서버로 요청을 보낼 때는 file형태로 보내야 하기 때문에 받아야 하는 데이터 타입이 불일치 하여 요청이 거부되는 문제가 발생하였습니다.
    -   백엔드 분과의 조율을 통해 수정 시, 기존에 있는 이미지는 파일명만 보내도록 하고, 이미지 수정이 있을 경우 기존 이미지의 파일명과 추가된 file을 같이 보내는 방법으로 수정하였습니다.
