package com.sidedish.api.categories;

import com.sidedish.api.common.ResultDto;
import com.sidedish.api.categories.dto.ItemResource;
import com.sidedish.api.categories.dto.ResponseItemDto;
import com.sidedish.domain.CategoryType;
import com.sidedish.domain.Item;
import com.sidedish.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.beans.PropertyEditorSupport;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final ItemService itemService;

    @ExceptionHandler
    public ResponseEntity<ResultDto> noSuchElementExceptionHandler(NoSuchElementException e) {
        return ResponseEntity.badRequest().body(ResultDto.error(e));
    }

    @InitBinder
    private void initBinder(final WebDataBinder webdataBinder) {
        webdataBinder.registerCustomEditor(CategoryType.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                setValue(CategoryType.valueOf(text.toUpperCase()));
            }
        });
    }

    @GetMapping("/{type}")
    public CollectionModel<ItemResource> getItemsByCategory(@PathVariable CategoryType type, @RequestParam Long pageId, @RequestParam(defaultValue = "4") int pageCount) {

        List<Item> items = itemService.findUnitPageById(type, pageId, pageCount);
        List<ItemResource> itemResources = items.stream().map(ItemResource::new).collect(Collectors.toList());

        CollectionModel<ItemResource> responseMainType = CollectionModel.of(itemResources);
        responseMainType.add(linkTo(methodOn(CategoryController.class).getItemsByCategory(type, pageId, pageCount)).withSelfRel());
        responseMainType.add(linkTo(methodOn(CategoryController.class).getItemsByCategory(type,pageId-1, pageCount)).withRel("prev-page"));
        responseMainType.add(linkTo(methodOn(CategoryController.class).getItemsByCategory(type, pageId+1, pageCount)).withRel("next-page"));

        return responseMainType;
    }

    @GetMapping("/{type}/detail")
    public List<ResponseItemDto> getItemByDetailType(@PathVariable String type) {
        List<Item> findItems = itemService.findItemByDetailType(type);
        return findItems.stream()
                .map(ResponseItemDto::new)
                .limit(3)
                .collect(Collectors.toList());
    }

    @GetMapping("/items/{itemId}")
    public ItemResource getSingleItem(@PathVariable Long itemId) {
        Item findItem = itemService.findItemById(itemId);
        return new ItemResource(findItem);
    }
}
