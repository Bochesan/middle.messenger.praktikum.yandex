import sinon from 'sinon';
import { expect } from 'chai';
import { METHODS } from '../utils/Enums.ts';
import Request from './Requests.ts';

describe('Request', () => {
  let request: Request;

  beforeEach(() => {
    request = new Request();
  });

  it('GET', async () => {
    const requestStub = sinon.stub(request, 'request').resolves();
    const data = { id: '1', test: '2' };

    const url = '/user';
    await request.get(url, { data });

    expect(requestStub.calledWithMatch(url, { method: METHODS.Get, data })).to.be.true;
  });

  it('POST', async () => {
    const requestStub = sinon.stub(request, 'request').resolves();
    const data = { id: '1', test: '2' };

    const url = '/user';
    await request.post(url, { data });

    expect(
      requestStub.calledWithMatch(url, {
        method: METHODS.Post,
        data,
      }),
    ).to.be.true;
  });

  it('PUT', async () => {
    const requestStub = sinon.stub(request, 'request').resolves();
    const data = { id: '1', test: '2' };

    const url = '/user';
    await request.put(url, { data });

    expect(
      requestStub.calledWithMatch(url, {
        method: METHODS.Put,
        data,
      }),
    ).to.be.true;
  });

  it('DELETE', async () => {
    const requestStub = sinon.stub(request, 'request').resolves();
    const data = { id: '1', test: '2' };

    const url = '/user';
    await request.delete(url, { data });

    expect(
      requestStub.calledWithMatch(url, {
        method: METHODS.Delete,
        data,
      }),
    ).to.be.true;
  });
});
