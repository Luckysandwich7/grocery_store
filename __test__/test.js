const mongodb = require('../db/connect');

const createControllerTests = (controller) => {
    let response;

    beforeEach(() => {
        // set up a mocked response object before each test case
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(), 
            setHeader: jest.fn(),
            send: jest.fn(),
        };
        // Mock the database operations
        mongodb.getDb = jest.fn().mockReturnValue({
            db: jest.fn.mockReturnThis(),
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn(),
            insertOne: jest.fn(),
            replaceOne: jest.fn(),
            deleteOne: jest.fn(),
        });
    });

    AfterEach( () => {
        // Clear all mock functions after each test 
        jest.clearAllMocks();
    });

    describe('Controller', () => {
        it('should handle internal server error', async () => {
            // create an error object
            const error = new Error('Internal Server Error');

            //Mock the behavior of a database operation
            mongodb.getDb().collection().find().toArray.mockRejectedValue(error);

            //call the controller function with an empty object
            await controller({}, response);

            // Check if the status function of respons object called
            expect(response.status).toHaveBeenCalledWith(500)
        });
    });
};

function getAllTest(controller, getAll) {
    describe(`${constroller}`, () => {
    describe(`${getAll} ${controller}`, () => {
      it(`should return all info in ${controller} if found`, async () => {
        const mockCollection = {
           find: jest.fn().mockReturnThis(),
           toArray: jest.fn().mockResolvedValueOnce(['Response1', 'Response2']),
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // call the findAll function
        await getAll({}, mockResponse);

        // Verify the response status and json data
        expect(mockResponse.status).toHaveBeenCalledWith(500);

        // Reset the _db variable
        global._db = undefined;
        });

        test('should return an error if no info found', async () => {
            const mockCollection = {
              find: jest.fn().mockReturnThis(),
              toArray: jest.fn().mockResolvedValueOnce([]),
            };
      
            const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
      
            // Call the findAllAdmin function
            await getAll({}, mockResponse);
      
            // Verify the response status and error message
            expect(mockResponse.status).toHaveBeenCalledWith(500);
      
            // Reset the _db variable
            global._db = undefined;
          });
      
          test('should return an error if an exception occurs', async () => {
            const mockError = new Error('Database error');
            const mockCollection = {
              find: jest.fn().mockReturnThis(),
              toArray: jest.fn().mockRejectedValueOnce(mockError),
            };
      
            const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn(),
            };
      
            // Call the findAllAdmin function
            await getAll({}, mockResponse);
      
      
            // Verify the response status and error message
            expect(mockResponse.status).toHaveBeenCalledWith(500);
      
            // Reset the _db variable
            global._db = undefined;
          });
        });
      });
    };
    
    module.exports = { createControllerTests, getAllTest };
