package com.sidedish.service;

import com.sidedish.domain.CategoryType;
import com.sidedish.domain.Item;
import com.sidedish.repository.CategoryRepository;
import com.sidedish.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ItemService {

    public static final String NOT_FOUND_PAGE_EXCEPTION = "존재하지 않는 페이지 입니다.";
    public static final String NOT_FOUND_ITEM_EXCEPTION = "존재하지 않는 아이템 입니다.";
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    public List<Item> findItemByDetailType(String type) {
        return itemRepository.findByDetailType(type);
    }

    public Item findItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_ITEM_EXCEPTION));
    }

    public void updateItem(Item orderItem) {
        itemRepository.save(orderItem);
    }

    public Page<Item> findUnitPageById(CategoryType type, Long pageId, int pageCount) {
        Long categoryId = categoryRepository.findCategoryType(type);
        PageRequest pageable = createPageRequest(pageId, pageCount);
        return itemRepository.findByCategory(categoryId, pageable);
    }

    public List<Item> suggestAnotherTypeItems(Long itemId, Long pageId, int pageCount) {
        Item findItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_ITEM_EXCEPTION));
        Long categoryFk = findItem.getCategory();
        PageRequest pageable = createPageRequest(pageId, pageCount);
        return itemRepository.findByCategoryNot(categoryFk, pageable);
    }

    private PageRequest createPageRequest(Long pageId, int pageCount) {
        int startPage = pageId.intValue() - 1;
        if (startPage < 0) {
            throw new NoSuchElementException(NOT_FOUND_PAGE_EXCEPTION);
        }
        PageRequest pageable = PageRequest.of(startPage, pageCount);
        return pageable;
    }
}
