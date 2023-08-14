import { Controller, Get, Query } from "@nestjs/common";
import { SortFilterTodoService } from "./sort.filter.service";
import { ApiQuery } from "@nestjs/swagger";

@Controller("sort-filter")
export class SortFilterTodoController {
    constructor(private readonly sortFilterTodoService: SortFilterTodoService) {}

    @Get("/all")
    @ApiQuery({name:"title", required:false})
    @ApiQuery({name:"createdAt", enum: ["asc", "desc"], required:false})
    @ApiQuery({name:"status", enum: ["true", "false"], required:false})
    @ApiQuery({name:"dueDate", enum: ["asc", "desc"], required:false})
    sortFilterTodos(
        @Query("title") title: string,
        @Query("createdAt") createdAt: string,
        @Query("status") status: string,
        @Query("dueDate") dueDate: string,
    ) {
        return this.sortFilterTodoService.sortFilterTodos({title, createdAt, status, dueDate});
    }

    @Get("/search-title")
    @ApiQuery({name:"title", required:false})
    searchTitleTodos(
        @Query("title") title: string,
    ) {
        return this.sortFilterTodoService.searchTitleTodos(title);
    }

    @Get("/filter-status")
    @ApiQuery({name:"status", enum: ["true", "false"], required:false})
    filterStatusTodos(
        @Query("status") status: string,
    ) {
        return this.sortFilterTodoService.filterStatusTodos(status);
    }

    @Get("/sorting-date")
    @ApiQuery({name:"createdAt", enum: ["asc", "desc"], required:false})
    @ApiQuery({name:"dueDate", enum: ["asc", "desc"], required:false})
    sortingTodos(
        @Query("createdAt") createdAt: string,
        @Query("dueDate") dueDate: string,
    ) {
        return this.sortFilterTodoService.sortingTodos(createdAt, dueDate);
    }
}
