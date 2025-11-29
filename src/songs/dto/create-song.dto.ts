import { IsNotEmpty, IsOptional, IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  artistId?: number;

  @IsOptional()
  @IsString()
  filePath?: string; // will be set after file upload

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryOnSongDto)
  categories?: CategoryOnSongDto[];
}
export class CreateCategoryDto {
  @IsString()
  name: string; // used if creating a new category
}

export class ConnectCategoryDto {
  @IsInt()
  id: number; // used if connecting an existing category
}

export class CategoryOnSongNestedDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  create?: CreateCategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectCategoryDto)
  connect?: ConnectCategoryDto;
}

export class CategoryOnSongDto {
  @IsOptional()
  @IsString()
  assignedBy?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryOnSongNestedDto)
  category?: CategoryOnSongNestedDto;
}


