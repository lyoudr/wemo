import { Controller, Post, Body, Param } from '@nestjs/common';
import { RentService } from './rent.service';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class StartRentDto {
    @ApiProperty({
        description: 'ID of the user renting the scooter',
        type: 'number',
    })
    userId: number;
    
    @ApiProperty({
        description: 'ID of the scooter being rented',
        type: 'number',
    })
    scooterId: number;
}

@Controller('rent')
export class RentController {
    constructor(private readonly rentService: RentService) {}

    @Post('start')
    @ApiOperation({ summary: 'Start a new rent for a user with a scooter' })
    @ApiBody({
        description: 'Request body to start a new rent',
        type: StartRentDto,  // Use a DTO to define the request body structure
    })
    @ApiResponse({
        status: 201,
        description: 'The scooter has been successfully rented',
    })
    async startRent(
        @Body('userId') userId: number,
        @Body('scooterId') scooterId: number,
    ){
        return this.rentService.rentScooter(userId, scooterId);
    }

    @Post('end/:rentId')
    @ApiOperation({ summary: 'End a rent by rent ID' })
    @ApiParam({
        name: 'rentId',
        type: 'number',
        description: 'The ID of the rent to end',
    })
    @ApiResponse({
        status: 200,
        description: 'The scooter has been successfully returned',
    })
    async endRent(@Param('rentId') rentId: number){
        return this.rentService.returnScooter(rentId);
    }
}