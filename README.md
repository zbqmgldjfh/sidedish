# TEAM-12 sidedish
그룹 프로젝트 #2

👨‍👩‍👧‍👦 멤버소개  
👨‍ 검봉 [@HeeChul Shin](https://github.com/geombong)  
👨‍ Shine [@zbqmgldjfh](https://github.com/zbqmgldjfh)  
👨‍ 파크 [@Sangjin Park](https://github.com/healtheloper)  
👨‍ Jimmy neutron [@Jimmy neutron](https://github.com/dlwnstjrzz)  

## 결과물

### 1. 메인화면
<img width="700" alt="스크린샷 2022-05-02 오후 4 43 49" src="https://user-images.githubusercontent.com/60593969/169643372-53c65114-7994-4212-a7d5-d9cc512fef3f.png">

### 2. 상품 디테일 화면 
<img width="700" alt="디테일 화면" src="https://user-images.githubusercontent.com/60593969/169643922-7c2a70eb-1cf6-4619-bb9a-3e6fc884b2e4.gif">

### 3. 메뉴 목록
<img width="700" alt="목록" src="https://user-images.githubusercontent.com/60593969/169643815-7b53e615-7a37-41f5-8644-2c76d3684213.gif">

### 4. 더보기
<img width="700" alt="더보기" src="https://user-images.githubusercontent.com/60593969/169643933-89487ed7-1f88-43bc-91a1-b63860a05762.gif">

----

## 기술적 시도
## RESTfull API를 위한 rest-docs와 hateoas

### 1. HATEOAS 
대표적으로 단건 아이템을 조회하는 다음 controller 코드를 살펴보자.
```java
    @GetMapping("/items/{itemId}")
    public ResponseSingleItemDto getSingleItem(@PathVariable Long itemId, @RequestParam(defaultValue = "1") Long pageId,
            @RequestParam(defaultValue = "5") int pageCount) {
        Item findItem = itemService.findItemById(itemId);
        ItemResource itemResource = new ItemResource(findItem);

        List<Item> items = itemService.suggestAnotherTypeItems(itemId, pageId, pageCount);
        List<ItemResource> itemResources = items.stream().map(ItemResource::new).collect(Collectors.toList());
        CollectionModel<ItemResource> responseMainType = CollectionModel.of(itemResources);
        responseMainType.add(linkTo(methodOn(CategoryController.class).getSingleItem(itemId ,pageId, pageCount)).withSelfRel());
        responseMainType.add(linkTo(methodOn(CategoryController.class).getSingleItem(itemId,pageId-1, pageCount)).withRel("prev-page"));
        responseMainType.add(linkTo(methodOn(CategoryController.class).getSingleItem(itemId, pageId+1, pageCount)).withRel("next-page"));
        return new ResponseSingleItemDto(itemResource, responseMainType);
    }
```

ItemResource을 사용하여 단건 아이템을 EntityModel로 wrapping 하고 있다.
```java
public class ItemResource extends EntityModel<ResponseItemDto> {
    public ItemResource(Item content) {
        super(new ResponseItemDto(content));
        add(linkTo(CategoryController.class).slash("/items/" + content.getId()).withSelfRel());
    }
}
```
이런 방식으로 Hateos를 통해 한번 감싸주면 여러 링크정보를 추가할 수 있다. 즉 rest api의 **상태전이 를 해결**할 수 있다.
API 반환값인 JSON에서도 다음과 같이 _link에 self에 대한 정보가 포함되게 된다.

```json
 
{
"id": 1,
"title": "고기1", "description": "반찬 설명", "price": 10000,
"badge": "EVENT", "discountPrice": 9000.0, "rewardPoint": 100, "images": {
    "mainUrl": "mainUrl",
    "sideOne": "one",
    "sideTwo": "two"
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/items/1"
    } 
  }
}
```

### Rest-docs 적용
rest docs를 통해 테스트 코드에서 문서를 함께 작성하게 되었다. 대표적으로 다음 코드와 같다.
```java
@Test
@DisplayName("단건의 아이템을 조회 해오는 테스트")
public void find_single_item_test() throws Exception {
    //given
    Category mainCategory = new Category(CategoryType.MAIN);
    Item newItem = new Item("소불고기", "반찬 설명", BigDecimal.valueOf(10000),
            10.0, Badge.EVENT, "풍성한고기반찬", 10, BigDecimal.valueOf(100), new Images("mainUrl", "one", "two"), new ShipInfo("서울 경기 새벽 배송, 전국 택배 배송", BigDecimal.valueOf(2500)));
    mainCategory.saveItem(newItem);
    categoryRepository.save(mainCategory);
    Long itemId = newItem.getId();

    // when & then
    ResultActions requestThenResult = mockMvc.perform(get("/api/categories/items/" + itemId)
            .accept(MediaTypes.HAL_JSON_VALUE));

    requestThenResult.andDo(print())
            .andExpect(status().isOk())
            .andExpect(header().string(HttpHeaders.CONTENT_TYPE, MediaTypes.HAL_JSON_VALUE))
            .andExpect(jsonPath("item.links[0].rel").value("self"))
            .andDo(document("search-single",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    responseHeaders(
                            headerWithName(HttpHeaders.CONTENT_TYPE).description("Content type")
                    ),
                    relaxedResponseFields(
                            fieldWithPath("item.id").description("id of item"),
                            fieldWithPath("item.title").description("title of item"),
                            fieldWithPath("item.description").description("description of item"),
                            fieldWithPath("item.price").description("price of item"),
                            fieldWithPath("item.badge").description("badge of item"),
                            fieldWithPath("item.discountPrice").description("discountPrice of item"),
                            fieldWithPath("item.rewardPoint").description("rewardPoint of item"),
                            fieldWithPath("item.images").description("images of item")
                    )
            ));
}
```

andDo(document)를 통해 테스트 코드로 문서를 작성하고 있다. 단건 조회 API 에 대한 테스트 코드 이다.
이런식으로 테스트 코드를 작성하면 다음과 같은 아스키독 문서를 얻을 수 있다.
<img width="700" alt="스크린샷 2022-05-21 오후 6 08 22" src="https://user-images.githubusercontent.com/60593969/169644547-ffbed0f1-3f28-400b-b7e3-326e18354734.png">


----
## Groud 규칙
팀 공통 작업 시간대 : 10 ~ 18시
팀 회의/스크럼 : 10 ~ 10:30 (이후는 class 별 개발 진행)

## 브렌치
<img width="500" alt="branch 전략" src="https://user-images.githubusercontent.com/58503584/163744103-263e3b3b-0856-4c81-a7d1-1fbe9710c830.png">

## 브렌치 컨벤션
### 브랜치 네이밍
`<tag>(/short-description)/<issue-id>`

- 예시)
```
fix/indentation-error
issues/update-documentaion
```

## issue-template
```
## 예상 동작

-- 이부분은 확인 후 지워주세요 --
제목은 자유롭게 작성
클래스에 맞추어 `Projects` 설정 해주세요 (ex. FE -> todolist-fe)
```
### Label
`BE`, `FE`

## PR-template
```
issue #{num}
{필요시 할말}

-- 이부분은 확인 후 지워주세요 --
제목 컨벤션 -> `[<who>] short-description`
본문에 이슈번호 태그 -> ex) issue #37
Projects 에는 올리지 않아도 됩니다 ( 요구기능은 issue 로 관리 중 )
```

##commit template
feat : 새로운 기능 추가

fix : 버그 수정

docs : 문서 관련

style : 스타일 변경 (포매팅 수정, 들여쓰기 추가, …)

refactor : 코드 리팩토링

test : 테스트 관련 코드

build : 빌드 관련 파일 수정

env : 기타 환경 설정

chore : 그 외 자잘한 수정
