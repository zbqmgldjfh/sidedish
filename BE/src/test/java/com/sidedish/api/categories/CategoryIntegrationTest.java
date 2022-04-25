package com.sidedish.api.categories;

import com.sidedish.domain.*;
import com.sidedish.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.linkWithRel;
import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.links;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@ActiveProfiles("local")
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class CategoryIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    void init() {
        Category mainCategory = new Category(CategoryType.MAIN);

        createMainItem(mainCategory, "고기1", "맛있는 고기1"); // page1
        createMainItem(mainCategory, "고기2", "맛있는 고기2"); // page1
        createMainItem(mainCategory, "고기3", "맛있는 고기3"); // page1
        createMainItem(mainCategory, "고기4", "맛있는 고기4"); // page1
        createMainItem(mainCategory, "고기5", "맛있는 고기5"); // page2
        createMainItem(mainCategory, "고기6", "맛있는 고기6"); // page2

        categoryRepository.save(mainCategory);
    }

    private void createMainItem(Category mainCategory, String name, String desc) {
        Item newItem = new Item(name, desc, BigDecimal.valueOf(10000),
                10.0, Badge.EVENT, "풍성한 고기 반찬", 10, BigDecimal.valueOf(100), new Images("mainUrl", "one", "two"));
        mainCategory.saveItem(newItem);
    }

    @Test
    @DisplayName("1 페이지 요청시 4개의 아이템을 반환해야 한다.")
    void find_main_category_use_pageId_test() throws Exception {
        // given
        ResultActions requestThenResult = mockMvc.
                perform(get("/api/categories/main?pageId=1")
                        .contentType(MediaType.APPLICATION_JSON)
                );

        // when
        requestThenResult.andDo(print())
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.CONTENT_TYPE, MediaTypes.HAL_JSON_VALUE))
                .andExpect(jsonPath("_embedded.responseItemDtoList[0]").exists())
                .andExpect(jsonPath("_embedded.responseItemDtoList[1]").exists())
                .andExpect(jsonPath("_embedded.responseItemDtoList[2]").exists())
                .andExpect(jsonPath("_embedded.responseItemDtoList[3]").exists())
                .andExpect(jsonPath("_embedded.responseItemDtoList.length()").value(4))
                .andExpect(jsonPath("_links.self").exists())
                .andExpect(jsonPath("_links.prev-page").exists())
                .andExpect(jsonPath("_links.next-page").exists())
                .andDo(document("search-main",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        links(
                                linkWithRel("self").description("link to self"),
                                linkWithRel("prev-page").description("link to prev page"),
                                linkWithRel("next-page").description("link to next page")
                        ),
                        requestHeaders(
                                headerWithName(HttpHeaders.CONTENT_TYPE).description("accept headers")
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.CONTENT_TYPE).description("Content type")
                        ),
                        relaxedResponseFields(
                                fieldWithPath("_links.self").description("link of main type item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].id").description("id of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].title").description("title of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].description").description("description of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].price").description("price of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].badge").description("Event name of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].discountPrice").description("discountPrice of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].rewardPoint").description("rewardPoint of item"),
                                fieldWithPath("_embedded.responseItemDtoList[0].images").description("images of item")
                        )
                ));
    }
}